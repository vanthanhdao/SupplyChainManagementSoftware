import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateShippingMethodDto {
  @IsString({ message: 'ShippingMethodName must be a string' })
  @IsNotEmpty({ message: 'ShippingMethodName is required' })
  ShippingMethodName: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  Description: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'ShippingCost is required' })
  ShippingCost: number;

  @IsString({ message: 'DeliveryTimeEstimate must be a string' })
  @IsNotEmpty({ message: 'DeliveryTimeEstimate is required' })
  DeliveryTimeEstimate: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'MaxWeight is required' })
  MaxWeight: number;

  @IsString({ message: 'ApplicableRegion must be a string' })
  @IsNotEmpty({ message: 'ApplicableRegion is required' })
  ApplicableRegion: string;

  @IsString({ message: 'PaymentMethod must be a string' })
  @IsNotEmpty({ message: 'PaymentMethod is required' })
  PaymentMethod: string;

  @IsBoolean({ message: 'Active must be a boolean value' })
  @IsOptional()
  Active: boolean;
}
