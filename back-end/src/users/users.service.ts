import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassHelper, hashWalletHelper } from 'src/utils/hash';
import { ConfigService } from '@nestjs/config';

// import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: ConfigService,
  ) {}

  // Check email address is exits
  async isEmailExits(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  // If query is /users find all users else users?page=&&limit= fillter users
  // Note type of fuction findAll ( Promise<{ data: Users[]; total: number }> )
  async findAll(query: any) {
    const { page, limit } = query;
    if (page && limit) {
      const [result, total] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        // order: { id: 'DESC' },
      });
      return { data: result, total };
    }
    return await this.usersRepository.find();
  }

  // Find users by id
  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // Delete users by id
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Add a new user to the database
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const {email, password,walletAdress } = createUserDto;
    const checkEmail = (await this.isEmailExits(email)) ? true : false;
    const secretKey = this.configService.get<string>('JWT_SECRET');
    if (!checkEmail) {
      const hashedPassword = await hashPassHelper(password);
      const hashedWallet = await hashWalletHelper(walletAdress.privateKey,secretKey)
      const user = this.usersRepository.create({
        email,
        password:hashedPassword,
        publicKey:walletAdress.publicKey,
        privateKey:hashedWallet
      });
      await this.usersRepository.save(user);
      return user;
    }
    throw new Error(`Email address ${email} already exists`);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
