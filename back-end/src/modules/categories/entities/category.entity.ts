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
  @Column({ type: 'nvarchar', length: 4000 })
  Description: string;
  @Column()
  Type: string;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
