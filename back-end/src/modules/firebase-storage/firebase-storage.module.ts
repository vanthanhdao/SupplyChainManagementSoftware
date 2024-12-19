import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseStorageController } from './firebase-storage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities/product.entity';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn file tối đa 5MB
    }),
    ProductsModule,
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [FirebaseStorageController],
  providers: [FirebaseStorageService],
  exports: [FirebaseStorageService],
})
export class FirebaseStorageModule {}
