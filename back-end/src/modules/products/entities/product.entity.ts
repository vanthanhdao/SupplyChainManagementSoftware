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

  @Column({ type: 'nvarchar', length: 4000 })
  Description: string;
  @Column()
  Price: number;
  @Column({ type: 'nvarchar', length: 4000 })
  Images: string;
  @Column({ type: 'nvarchar', length: 4000 })
  Specifications: string;
  @Column()
  CategoryId: number;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
