import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  hashPassHelper,
  hashWalletHelper,
  reHashWalletHelper,
} from 'src/utils/hash';
import { ConfigService } from '@nestjs/config';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: ConfigService,
    
  ) {}

  // Check email address is exits
  async isEmailExits(email: string): Promise<Users> {
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

  // Find wallet users by id
  async findOneWallet(payload: IUserAccessToken): Promise<IUserWalletAddress> {
    const user = await this.usersRepository.findOneBy({ id: payload.userId });
    const privateKeyDecrypt = await reHashWalletHelper(
      user.privateKey,
      this.configService.get<string>('JWT_SECRET'),
    );
    const res = {
      publicKey: user.publicKey,
      privateKey: privateKeyDecrypt,
    };
    return res;
  }

  // Find wallet users by id
  async findOneProfile(payload: IUserAccessToken): Promise<IUserAccessToken> {
    const user = await this.usersRepository.findOneBy({ id: payload.userId });
    const res = {
      userId: user.id,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
    };
    return res;
  }

  // Delete users by id
  async remove(deleteUserDto: DeleteUserDto): Promise<void> {
    const { email, walletAddress } = deleteUserDto;
    const user = await this.usersRepository.findOneBy({ 
      email,
      publicKey: walletAddress.publicKey,
    });
    if(!user) throw new Error(`User with ${email} is not exists`);
    await this.usersRepository.delete(user.id);
  }

  // Add a new user to the database
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, walletAddress } = createUserDto;
    const checkEmail = (await this.isEmailExits(email)) ? true : false;
    const secretKey = this.configService.get<string>('JWT_SECRET');
    if (!checkEmail) {
      const hashedPassword = await hashPassHelper(password);
      const hashedWallet = await hashWalletHelper(
        walletAddress.privateKey,
        secretKey,
      );
      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        publicKey: walletAddress.publicKey,
        privateKey: hashedWallet,
      });
      await this.usersRepository.save(user);
      return user;
    }
    throw new Error(`Email address ${email} already exists`);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

   async update(payload: IUserAccessToken,isActive:boolean) {
    const {userId} = payload;
    const user = await this.usersRepository.findOneBy({ id:userId });
    const updateDate = new Date();
    if (!user) throw new Error(`User with ${payload.userId} is not exists`);
    user.isActive = isActive;
    user.updateAt = updateDate.toString();
    await this.usersRepository.save(user);
  }
}
