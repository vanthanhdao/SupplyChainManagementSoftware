import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'productName is required' })
  productName: string;
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  @IsNotEmpty({ message: 'price is required' })
  price: number;
  @IsNotEmpty({ message: 'images is required' })
  images: string;
  @IsNotEmpty({ message: 'specificactions is required' })
  specifications: string;
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: number;
}
