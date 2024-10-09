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

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isValidWalletAdress = compareHelper(password, user.password);
    if (!user && !isValidWalletAdress) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      publicKey: user.publicKey,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
