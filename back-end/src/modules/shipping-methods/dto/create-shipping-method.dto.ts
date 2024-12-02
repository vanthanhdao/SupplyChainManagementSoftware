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
  shippingMethodName: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'ShippingCost is required' })
  shippingCost: number;

  @IsString({ message: 'DeliveryTimeEstimate must be a string' })
  @IsNotEmpty({ message: 'DeliveryTimeEstimate is required' })
  deliveryTimeEstimate: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'MaxWeight is required' })
  maxWeight: number;

  @IsString({ message: 'ApplicableRegion must be a string' })
  @IsNotEmpty({ message: 'ApplicableRegion is required' })
  applicableRegion: string;

  @IsString({ message: 'PaymentMethod must be a string' })
  @IsNotEmpty({ message: 'PaymentMethod is required' })
  paymentMethod: string;

  @IsNotEmpty({ message: 'Active is required' })
  active: string;
}
