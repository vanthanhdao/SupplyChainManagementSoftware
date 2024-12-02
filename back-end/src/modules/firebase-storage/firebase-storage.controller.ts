import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('firebase-storage')
export class FirebaseStorageController {
  constructor(
    private readonly firebaseStorageService: FirebaseStorageService,
  ) {}
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded!');
    }
    const uploadedUrls = await Promise.all(
      files.map((file) =>
        this.firebaseStorageService.uploadFile(file, 'uploads'),
      ),
    );

    return uploadedUrls;
  }
}
