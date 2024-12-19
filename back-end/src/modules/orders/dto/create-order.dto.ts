import {
  IsString,
  IsNumber,
  IsOptional,
  IsDecimal,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'Delivery date is required.' })
  deliveryDate: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Customer ID is required.' })
  customerId: number;

  @IsString()
  @IsNotEmpty({ message: 'Shipping address is required.' })
  shippingAddress: string;

  @IsString()
  @IsNotEmpty({ message: 'Payment method is required.' })
  paymentMethod: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Shipping method is required.' })
  shippingMethodId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Total amount is required.' })
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Tax rate is required.' })
  taxRate: number;

  @IsOptional() // Optional vì có giá trị mặc định
  @IsString()
  status?: string;

  @IsOptional() // Optional vì có giá trị mặc định
  @IsNumber()
  subOrderId?: number;

  @IsOptional() // Optional vì có giá trị mặc định
  @IsNumber()
  sellerId?: number;

  @IsString()
  @IsNotEmpty({ message: 'Note is required.' })
  note: string;
}
