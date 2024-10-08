import { UsersService } from './../users/users.service';
import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHelper } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, walletAdress: string) {
    const user = await this.usersService.findByEmail(email);
    const isValidWalletAdress = compareHelper(walletAdress, user.walletAdress);
    if (!user && !isValidWalletAdress) {
      throw new UnauthorizedException();
    }
    const payload = {
      nameCompany: user.nameCompany,
      email: user.email,
      walletAdress: user.walletAdress,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
