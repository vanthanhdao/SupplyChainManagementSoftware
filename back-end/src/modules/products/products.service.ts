import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    // private configService: ConfigService,
  ) {}

  // Add a new product to the database
  async create(createProductDto: CreateProductDto): Promise<Products> {
    try {
      const {
        productName,
        description,
        price,
        images,
        specifications,
        categoryId,
      } = createProductDto;
      const product = this.productsRepository.create({
        ProductName: productName,
        Description: description,
        Price: price,
        Images: images,
        Specifications: specifications,
        CategoryId: categoryId,
      });
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }

  // Add list new product to the database
  async createListProduct(data: CreateProductDto[], role: string) {
    try {
      // const savePromises = data.map(async (item) => {
      //   const product = this.productsRepository.create({
      //     ProductName: item.productName,
      //     Description: item.description,
      //     Price: item.price,
      //     Images: item.images,
      //     Specifications: item.specifications,
      //     CategoryId: item.categoryId,
      //     Type: 'product',
      //   });

      //   if (!product) {
      //     throw new Error(`Product with ${product.ProductId} does not exist`);
      //   }

      //   return this.productsRepository.save(product);
      // });

      // // Wait for all promises to resolve
      // await Promise.all(savePromises);
      for (const item of data) {
        const product = this.productsRepository.create({
          ProductName: item.productName,
          Description: item.description,
          Price: item.price,
          Images: item.images,
          Specifications: item.specifications,
          CategoryId: item.categoryId,
          Type: role === 'SUPPLIER' ? 'material' : 'product',
        });

        if (!product) {
          throw new Error(`Product with ${product.ProductId} does not exist`);
        }

        await this.productsRepository.save(product);
      }
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }

  // Update list new product to the database
  async updateListProduct(data: UpdateProductDto[]) {
    try {
      for (const item of data) {
        const product = await this.productsRepository.findOneBy({
          ProductId: item.productId,
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} does not exist`);
        }
        const updateDate = new Date();
        product.ProductName = item.productName;
        product.Description = item.description;
        product.Price = item.price;
        product.Images = item.images;
        product.Specifications = item.specifications;
        product.CategoryId = item.categoryId;
        product.UpdateAt = updateDate.toString();

        await this.productsRepository.save(product);
      }
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }

  // Delete list product to the database
  async deleteListProduct(data: UpdateProductDto[]) {
    try {
      const productIds = data.map((item) => item.productId);
      if (productIds.length === 0) {
        throw new Error('No products to delete');
      }
      await this.productsRepository.delete({
        ProductId: In(productIds),
      });
    } catch (error) {
      throw new Error(`Create product failed: ${error} `);
    }
  }

  async findAll(query: any, payload: IUserAccessToken) {
    const { page, limit } = query;
    const role = payload.role;
    const resultProcedure = await this.productsRepository.query(
      'EXEC pro_GetAllProductsHaveCategory @0',
      [role],
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

  async findAllStorePage(query: any, payload: IUserAccessToken) {
    const { page, limit } = query;
    const role = payload.role;
    const resultProcedure = await this.productsRepository.query(
      'EXEC pro_GetAllProductsHaveCategory_StorePage @0',
      [role],
    );
    if (page && limit) {
      const [result, total] = await resultProcedure.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data: result, total };
    }
    return resultProcedure;
  }

  async findAllById(orderId: number) {
    const resultProcedure = await this.productsRepository.query(
      'EXEC pro_GetProductByOrderId @0',
      [orderId],
    );
    return resultProcedure;
  }

  updateRecord(data: any, payload: IUserAccessToken) {
    const role = payload.role;
    const createProduct = data.filter(
      (item) => item.isNew && item.active === null,
    );
    const updateProduct = data.filter(
      (item) => !item.isNew && item.active === null,
    );
    const deleteProduct = data.filter(
      (item) => !item.isNew && item.active === 'delete',
    );
    if (createProduct && createProduct.length > 0)
      this.createListProduct(createProduct, role);
    if (updateProduct && updateProduct.length > 0)
      this.updateListProduct(updateProduct);
    if (deleteProduct && deleteProduct.length > 0)
      this.deleteListProduct(deleteProduct);
  }

  async findOneById(productId: number): Promise<Products> {
    return await this.productsRepository.findOneBy({
      ProductId: productId,
    });
  }
}
