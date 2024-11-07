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
  @Column({nullable:true})
  NameCompany: string;
  @Column()
  Email: string;
  @Column()
  Password: string;
  @Column({nullable:true})
  TaxCode: number;
  @Column()
  PublicKey: string;
  @Column()
  PrivateKey: string;
  @Column({nullable:true})
  Certificates: string;
  @Column({nullable:true})
  PhoneNumber: number;
  @Column({ default: false })
  IsActive: boolean;
  @Column({ default: 'USER' })
  Role: string;
  @CreateDateColumn()
  CreateAt: string;
  @UpdateDateColumn()
  UpdateAt: string;
}
