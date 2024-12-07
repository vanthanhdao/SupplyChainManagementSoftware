import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    // private configService: ConfigService,
  ) {}
  // Add a new Order to the database
  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    try {
      const {
        deliveryDate,
        customerId,
        paymentMethod,
        shippingAddress,
        shippingMethodId,
        taxRate,
        totalAmount,
        note,
        status,
      } = createOrderDto;
      const Order = this.ordersRepository.create({
        DeliveryDate: deliveryDate,
        CustomerId: customerId,
        PaymentMethod: paymentMethod,
        ShippingAddress: shippingAddress,
        ShippingMethodId: shippingMethodId,
        TaxRate: taxRate,
        TotalAmount: totalAmount,
        Note: note,
        Status: status,
      });
      await this.ordersRepository.save(Order);
      return Order;
    } catch (error) {
      throw new Error(`Create Order failed: ${error} `);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
