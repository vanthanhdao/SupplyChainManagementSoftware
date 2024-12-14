import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: string, @Request() req) {
    return this.ordersService.findAll(query, req.user);
  }

  @Post('canclePOs')
  deleteById(@Body() deleteOrderDto: number[]) {
    return this.ordersService.deleteById(deleteOrderDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }
}
