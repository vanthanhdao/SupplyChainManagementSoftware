import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingMethodDto } from './create-shipping-method.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateShippingMethodDto extends PartialType(
  CreateShippingMethodDto,
) {
  @IsNotEmpty({ message: 'ShippingMethodID is required' })
  shippingMethodID: number;
}
