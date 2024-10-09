import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty({ message: 'Name Company is required' })
  // nameCompany: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 character' })
  password: string;

  // @IsNotEmpty({ message: 'Tax Code is required' })
  // @IsInt()
  // taxCode: number;

  @IsNotEmpty({ message: 'Wallet Address is required' })
  walletAdress: {
    publicKey:string
    privateKey:string
  };

  // @IsNotEmpty({ message: 'Certificates is required' })
  // certificates: string;

  // @IsNotEmpty({ message: 'Phone Number is required' })
  // @IsInt()
  // // @IsPhoneNumber('VN', { message: 'Phone Number is invalid' })
  // phoneNumber: number;
}
