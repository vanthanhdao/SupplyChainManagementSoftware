import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseStorageController } from './firebase-storage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn file tối đa 5MB
    }),
  ],
  controllers: [FirebaseStorageController],
  providers: [FirebaseStorageService],
})
export class FirebaseStorageModule {}
