import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto[]) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get(':id')
  findAllById(@Param('id') id: string) {
    return this.orderDetailsService.findAllById(+id);
  }

  @Get('group/:id')
  findGroupById(@Param('id') orderId: string) {
    return this.orderDetailsService.findGroupById(+orderId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }
}
