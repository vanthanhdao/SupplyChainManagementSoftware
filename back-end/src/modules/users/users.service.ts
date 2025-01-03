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
    const user = await this.usersRepository.findOne({
      where: { Email: email },
    });
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

  async getUserByBlock(data: any): Promise<Users[]> {
    const result = await Promise.all(
      data.map(async (item) => {
        return await this.usersRepository.findOneBy({
          PublicKey: item.address,
        });
      }),
    );
    return result;
  }

  // Find wallet users by id
  async findOneWallet(payload: IUserAccessToken): Promise<IUserWalletAddress> {
    const user = await this.usersRepository.findOneBy({
      UserId: payload.userId,
    });
    const privateKeyDecrypt = await reHashWalletHelper(
      user.PrivateKey,
      this.configService.get<string>('JWT_SECRET'),
    );
    const res = {
      publicKey: user.PublicKey,
      privateKey: privateKeyDecrypt,
    };
    return res;
  }

  // Find wallet users by id
  async findOneProfile(payload: IUserAccessToken): Promise<IUserAccessToken> {
    const user = await this.usersRepository.findOneBy({
      UserId: payload.userId,
    });
    const res = {
      userId: user.UserId,
      email: user.Email,
      isActive: user.IsActive,
      role: user.Role,
    };
    return res;
  }

  // Delete users by id
  async remove(deleteUserDto: DeleteUserDto): Promise<void> {
    const { email, walletAddress } = deleteUserDto;
    const user = await this.usersRepository.findOneBy({
      Email: email,
      PublicKey: walletAddress.publicKey,
    });
    if (!user) throw new Error(`User with ${email} is not exists`);
    await this.usersRepository.delete(user.UserId);
  }

  // Add a new user to the database
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, walletAddress, fullName, taxCode, phoneNumber } =
      createUserDto;
    const role = (email === "admin@gmail.com") ? "ADMIN" : "USER";
    const isActie = (email === "admin@gmail.com") ? true : false;
    const checkEmail = (await this.isEmailExits(email)) ? true : false;
    const secretKey = this.configService.get<string>('JWT_SECRET');
    if (!checkEmail) {
      const hashedPassword = await hashPassHelper(password);
      const hashedWallet = await hashWalletHelper(
        walletAddress.privateKey,
        secretKey,
      );
      const user = this.usersRepository.create({
        Email: email,
        Password: hashedPassword,
        NameCompany: fullName,
        PublicKey: walletAddress.publicKey,
        PrivateKey: hashedWallet,
        TaxCode: taxCode,
        PhoneNumber: phoneNumber,
        Role:role,
        IsActive:isActie
      });
      await this.usersRepository.save(user);
      return user;
    }
    throw new Error(`Email address ${email} already exists`);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ Email: email });
  }

  async update(payload: IUserAccessToken, isActive: boolean) {
    const { userId } = payload;
    const user = await this.usersRepository.findOneBy({ UserId: userId });
    const updateDate = new Date();
    if (!user) throw new Error(`User with ${payload.userId} is not exists`);
    user.IsActive = isActive;
    user.UpdateAt = updateDate.toString();
    await this.usersRepository.save(user);
  }

  // async bulkUpdate(usersData: { userId: number; fieldsToUpdate: Partial<User> }[]) {
  //   const updatePromises = usersData.map(({ userId, fieldsToUpdate }) =>
  //     this.usersRepository.update(userId, {
  //       ...fieldsToUpdate,
  //       updateAt: new Date().toISOString(),
  //     }),
  //   );

  //   await Promise.all(updatePromises); // Thực thi tất cả các cập nhật đồng thời
  // }
}
