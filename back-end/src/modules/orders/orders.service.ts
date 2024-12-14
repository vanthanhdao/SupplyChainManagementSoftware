import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteOrderDto } from './dto/delete-order.dto';
import { OrderDetailsService } from '../order-details/order-details.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private readonly orderDetailsService: OrderDetailsService,
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

  async findAll(query: any, payload: IUserAccessToken) {
    const { page, limit } = query;
    const userId = payload.userId;
    const role = payload.role;
    const resultProcedure = await this.ordersRepository.query(
      'EXEC pro_GetAllOrders @0 , @1',
      [userId, role],
    );
    if (page && limit) {
      const [result, total] = await resultProcedure.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        // order: { id: 'DESC' },
      });
      return { data: result, total };
    }
    return resultProcedure;
  }

  // Delete list  order to the database
  async deleteById(data: number[]) {
    try {
      await this.ordersRepository.delete({
        OrderId: In(data),
      });
      await this.orderDetailsService.deleteById(data);
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }
}
