import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetails } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  create(createOrderDetailDto: CreateOrderDetailDto[]) {
    try {
      const orderDetails = createOrderDetailDto.map((item) =>
        this.orderDetailsRepository.save(
          this.orderDetailsRepository.create({
            OrderId: item.orderId,
            ProductId: item.productId,
            Quantity: item.quantity,
            Unit: item.unit,
            UnitPrice: item.unitPrice,
            Subtotal: item.subTotal,
          }),
        ),
      );

      Promise.all(orderDetails);
      return orderDetails;
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
