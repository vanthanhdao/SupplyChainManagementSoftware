import { Allow } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblSCMS_Users')
export class Users {
  @PrimaryGeneratedColumn()
  UserId: number;
  @Column({ default: null })
  NameCompany: string;
  @Column()
  Email: string;
  @Column()
  Password: string;
  @Column({ default: null })
  TaxCode: string;
  @Column({ default: null })
  Certificates: string;
  @Column({ default: null })
  PhoneNumber: string;
  @Column({ default: false })
  IsActive: boolean;
  @Column({ default: null })
  Role: string;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
