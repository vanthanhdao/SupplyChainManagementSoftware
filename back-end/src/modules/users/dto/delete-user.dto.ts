import {
    IsEmail,
    IsNotEmpty,
  } from 'class-validator';
  
  export class DeleteUserDto {

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;
  
    @IsNotEmpty({ message: 'Wallet Address is required' })
    walletAddress: {
      publicKey: string;
      privateKey: string;
    };

  }
  