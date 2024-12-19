import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL } from 'firebase-admin/storage';

import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FirebaseStorageService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private readonly productsService: ProductsService,
  ) {}
  private bucket = admin.storage().bucket();

  // Upload file và tạo URL công khai
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const uniqueFileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileRef = this.bucket.file(uniqueFileName);

    // Upload file lên Firebase Storage
    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });
    // await fileRef.makePublic();
    // Tạo token để tạo URL công khai
    const token = uuidv4();
    await fileRef.setMetadata({
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    });

    const downloadUrl = await getDownloadURL(fileRef);

    return downloadUrl;
  }

  async uploadFileToSave(files: string[], productId: number) {
    const Product = await this.productsService.findOneById(productId);

    if (!Product) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }
    const formatImages = files.join(',');
    Product.Images = formatImages;
    return await this.productsRepository.save(Product);
  }
}
