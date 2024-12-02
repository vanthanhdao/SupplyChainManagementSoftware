import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL } from 'firebase-admin/storage';

@Injectable()
export class FirebaseStorageService {
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
}
