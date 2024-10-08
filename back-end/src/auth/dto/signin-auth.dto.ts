import { IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Wallet Address is required' })
  walletAddress: string;
}
