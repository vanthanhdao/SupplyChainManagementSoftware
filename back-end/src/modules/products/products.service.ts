import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import {  Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    // private configService: ConfigService,
    
  ) {}

  // Add a new category to the database
  async create(createProductDto: CreateProductDto): Promise<Products> {
    try{
      const { productName,description,price,images,specificactions,categoryId} = createProductDto;
      const product = this.productsRepository.create({
        ProductName:productName,
        Description: description,
        Price:price,
        Images:images,
        Specifications:specificactions,
        CategoryId:categoryId
      });
      await this.productsRepository.save(product);
      return product;
    }catch(error){
      throw new Error(`Create product failed: ${error} `);
    }
  }

  async findAll(query: any) {
    const { page, limit } = query;
    const resultProcedure =  await this.productsRepository.query(
      'EXEC pro_ViewAllProducts'
    );
    if (page && limit) {
      // const [result, total] = await this.productsRepository.findAndCount({
      //   skip: (page - 1) * limit,
      //   take: limit,
      //   // order: { id: 'DESC' },
      // });
      const [result, total] = await resultProcedure.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        // order: { id: 'DESC' },
      });
      return { data: result, total };
    }
    return resultProcedure;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
