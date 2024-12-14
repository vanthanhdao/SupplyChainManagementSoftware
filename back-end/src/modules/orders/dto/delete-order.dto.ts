import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class DeleteOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty({ message: 'orderId is required' })
  @IsNumber()
  orderId: number;
}
