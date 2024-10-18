import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassHelper, hashWalletHelper, reHashWalletHelper } from 'src/utils/hash';
import { ConfigService } from '@nestjs/config';

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

  // Find users by id
  async findOne(id: number, payload: any): Promise<any> {
    if (id !== payload.userId) {
      throw new ForbiddenException('You do not have permission to access this user');
    }
    const user = await this.usersRepository.findOneBy({ id });
    const privateKeyDecrypt =  await reHashWalletHelper(user.privateKey,this.configService.get<string>('JWT_SECRET'));
    const res = {
      publicKey :user.publicKey,
      privateKey :privateKeyDecrypt
    }
    return res
  }

  // Delete users by id
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
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

  //  // Hàm cập nhật thông tin người dùng
  //  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
  //   // Tìm kiếm người dùng theo ID
  //   const user = await this.usersRepository.findOne({ where: { id } });

  //   // Nếu không tìm thấy người dùng, throw lỗi
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   // Cập nhật thông tin người dùng với dữ liệu mới
  //   Object.assign(user, updateUserDto);

  //   // Lưu lại người dùng đã cập nhật vào cơ sở dữ liệu
  //   return this.usersRepository.save(user);
  // }


}
