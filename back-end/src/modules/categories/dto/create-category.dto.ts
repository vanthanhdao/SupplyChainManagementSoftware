import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsPhoneNumber,
    Max,
    Min,
    MinLength,
  } from 'class-validator';
  
  export class CreateCategoryDto {
  
    @IsNotEmpty({ message: 'CategoryName is required' })
    categoryName: string;
  
    @IsNotEmpty({ message: 'Description is required' })
    description: string;
  
  }
  
