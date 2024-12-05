import {
  IsString,
  IsNumber,
  IsOptional,
  IsDecimal,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty({ message: 'Delivery date is required.' })
  deliveryDate: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Customer ID is required.' })
  customerId: number;

  @IsString()
  @IsNotEmpty({ message: 'Shipping address is required.' })
  @Length(1, 500)
  shippingAddress: string;

  @IsString()
  @IsNotEmpty({ message: 'Payment method is required.' })
  @Length(1, 255)
  paymentMethod: string;

  @IsString()
  @IsNotEmpty({ message: 'Shipping method is required.' })
  @Length(1, 500)
  shippingMethod: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'Total amount is required.' })
  totalAmount: number;

  @IsDecimal()
  @IsNotEmpty({ message: 'Tax rate is required.' })
  taxRate: number;

  @IsOptional() // Optional vì có giá trị mặc định
  @IsString()
  @Length(1, 50)
  status?: string;

  @IsString()
  @IsNotEmpty({ message: 'Note is required.' })
  @Length(1, 4000)
  note: string;
}
