import { IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
