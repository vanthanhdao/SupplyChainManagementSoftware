import { Controller, Get, Post, Body, Query, Request } from '@nestjs/common';
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
  findAll(@Query() query: string, @Request() req) {
    return this.productsService.findAll(query, req.user);
  }

  @Post('updateRecords')
  updateRecord(@Body() data: any, @Request() req) {
    return this.productsService.updateRecord(data, req.user);
  }
}
