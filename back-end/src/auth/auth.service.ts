import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { compareHelper } from 'src/utils/hash';

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
    const user = await this.usersService.findByEmail(email);
    const isValidWalletAdress = compareHelper(password, user.password);
    if (!user && !isValidWalletAdress) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
