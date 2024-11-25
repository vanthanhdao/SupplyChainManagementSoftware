import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.productsService.findAll(query);
  }

  @Post('updateRecords')
  updateRecord(@Body() data: any) {
    return this.productsService.updateRecord(data);
  }
}
