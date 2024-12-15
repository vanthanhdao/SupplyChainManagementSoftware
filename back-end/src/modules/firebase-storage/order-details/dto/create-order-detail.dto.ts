import { IsNumber, IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Product ID is required.' })
  productId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Quantity is required.' })
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Unit is required.' })
  unit: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'Unit price is required.' })
  unitPrice: number;

  @IsDecimal()
  @IsNotEmpty({ message: 'subTotal price is required.' })
  subTotal: number;
}
