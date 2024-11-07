import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { compareHelper } from 'src/utils/hash';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async signIn(email: string, password: string) {
  //   const user = await this.usersService.findByEmail(email);
  //   const isValidWalletAdress = compareHelper(password, user.password);
  //   if (!user && !isValidWalletAdress) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = {
  //     email: user.email,
  //     publicKey: user.publicKey,
  //     isActive:user.isActive,
  //     role: user.role,
  //   };
  //   return {
  //     data:payload,
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      const isValidPassword = await compareHelper(password, user.Password);
      if (!user || !isValidPassword) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new Error(`AuthService ValidateUser failed: ${err}`);
    }
  }

  async signIn(user: Users) {
    try {
      const payload = {
        userId: user.UserId,
        email: user.Email,
        isActive: user.IsActive,
        role: user.Role,
      };
      const tokenId = uuidv4();
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(
          { ...payload, tokenId },
          { expiresIn: '7d' },
        ),
      };
    } catch (err) {
      throw new Error(`AuthService SignIn failed: ${err}`);
    }
  }
}
