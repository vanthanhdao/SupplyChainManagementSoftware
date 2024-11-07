import { Allow } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblSCMS_Products')
export class Products {
  @PrimaryGeneratedColumn()
  ProductId: number;
  @Column()
  ProductName: string;
  @Column()
  Description: string;
  @Column()
  Price: number;
  @Column()
  Images: string;
  @Column()
  Specifications: string;
  @Column()
  CategoryId:number;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
