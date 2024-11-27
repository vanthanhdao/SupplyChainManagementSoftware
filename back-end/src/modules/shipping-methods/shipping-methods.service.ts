import { Injectable } from '@nestjs/common';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { ShippingMethod } from './entities/shipping-method.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private shippingMethodsRepo: Repository<ShippingMethod>,
  ) {}

  create(createShippingMethodDto: CreateShippingMethodDto) {
    return 'This action adds a new shippingMethod';
  }

  async findAll(query: any) {
    const { page, limit } = query;
    if (page && limit) {
      // const [result, total] = await this.shippingMethodsRepo.findAndCount({
      //   skip: (page - 1) * limit,
      //   take: limit,
      //   // order: { id: 'DESC' },
      // });
      const [result, total] = await this.shippingMethodsRepo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        // order: { id: 'DESC' },
      });
      return { data: result, total };
    }
    return await this.shippingMethodsRepo.find();
  }

  // Add list new shipping to the database
  async createListShippingMethod(data: CreateShippingMethodDto[]) {
    try {
      data.forEach(async (item) => {
        const shipping = this.shippingMethodsRepo.create({
          ShippingMethodName: item.shippingMethodName,
          Description: item.description,
          ShippingCost: item.shippingCost,
          DeliveryTimeEstimate: item.deliveryTimeEstimate,
          MaxWeight: item.maxWeight,
          ApplicableRegion: item.applicableRegion,
          PaymentMethod: item.paymentMethod,
          Active: item.active,
        });
        if (!shipping)
          throw new Error(
            `shipping with ${shipping.ShippingMethodID} is not exists`,
          );
        await this.shippingMethodsRepo.save(shipping);
      });
    } catch (error) {
      throw new Error(`Create shipping failed: ${error} `);
    }
  }

  // Update list new shipping to the database
  async updateListShippingMethod(data: UpdateShippingMethodDto[]) {
    try {
      data.forEach(async (item) => {
        const shipping = await this.shippingMethodsRepo.findOneBy({
          ShippingMethodID: item.shippingMethodID,
        });
        if (!shipping)
          throw new Error(
            `shipping with ${shipping.ShippingMethodID} is not exists`,
          );
        const updateDate = new Date();
        (shipping.ShippingMethodName = item.shippingMethodName),
          (shipping.Description = item.description),
          (shipping.ShippingCost = item.shippingCost),
          (shipping.DeliveryTimeEstimate = item.deliveryTimeEstimate),
          (shipping.MaxWeight = item.maxWeight),
          (shipping.ApplicableRegion = item.applicableRegion),
          (shipping.PaymentMethod = item.paymentMethod),
          (shipping.Active = item.active),
          (shipping.UpdatedAt = updateDate.toString());
        await this.shippingMethodsRepo.save(shipping);
      });
    } catch (error) {
      throw new Error(`Update shipping failed: ${error} `);
    }
  }

  // Delete list new shipping to the database
  async deleteListShippingMethod(data: UpdateShippingMethodDto[]) {
    try {
      data.forEach(async (item) => {
        const shipping = await this.shippingMethodsRepo.findOneBy({
          ShippingMethodID: item.shippingMethodID,
        });
        if (!shipping)
          throw new Error(
            `shipping with ${shipping.ShippingMethodID} is not exists`,
          );
        await this.shippingMethodsRepo.delete(shipping.ShippingMethodID);
      });
    } catch (error) {
      throw new Error(`Delete shipping failed: ${error} `);
    }
  }

  updateRecord(data: any) {
    const createshipping = data.filter(
      (item) => item.isNew && item.activeRow === null,
    );
    const updateshipping = data.filter(
      (item) => !item.isNew && item.activeRow === null,
    );
    const deleteshipping = data.filter(
      (item) => !item.isNew && item.activeRow === 'delete',
    );
    if (createshipping && createshipping.length > 0)
      this.createListShippingMethod(createshipping);
    if (updateshipping && updateshipping.length > 0)
      this.updateListShippingMethod(updateshipping);
    if (deleteshipping && deleteshipping.length > 0)
      this.deleteListShippingMethod(deleteshipping);
  }
}
