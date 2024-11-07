import { Allow } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblSCMS_Categories')
export class Categories {
  @PrimaryGeneratedColumn()
  CategoryId: number;
  @Column()
  CategoryName: string;
  @Column()
  Description: string;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
