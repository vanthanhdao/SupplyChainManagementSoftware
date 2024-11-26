import { Module } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { ShippingMethodsController } from './shipping-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from './entities/shipping-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  controllers: [ShippingMethodsController],
  providers: [ShippingMethodsService],
})
export class ShippingMethodsModule {}
