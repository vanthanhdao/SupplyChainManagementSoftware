import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';

@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(
    private readonly shippingMethodsService: ShippingMethodsService,
  ) {}

  @Post()
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodsService.create(createShippingMethodDto);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.shippingMethodsService.findAll(query);
  }

  @Post('updateRecords')
  updateRecord(@Body() data: any) {
    return this.shippingMethodsService.updateRecord(data);
  }
}
