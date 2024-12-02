import { PartialType } from '@nestjs/mapped-types';
import { CreateFirebaseStorageDto } from './create-firebase-storage.dto';

export class UpdateFirebaseStorageDto extends PartialType(CreateFirebaseStorageDto) {}
