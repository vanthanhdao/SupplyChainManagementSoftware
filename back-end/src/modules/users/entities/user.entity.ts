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
  @Column()
  NameCompany: string;
  @Column()
  Email: string;
  @Column()
  Password: string;
  @Column()
  TaxCode: string;
  @Column()
  PublicKey: string;
  @Column()
  PrivateKey: string;
  @Column({ nullable: true })
  Certificates: string;
  @Column()
  PhoneNumber: string;
  @Column({ default: false })
  IsActive: boolean;
  @Column({ default: 'USER' })
  Role: string;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
