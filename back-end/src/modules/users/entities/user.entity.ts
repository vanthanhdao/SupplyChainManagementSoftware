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
  id: number;
  @Column({nullable:true})
  nameCompany: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({nullable:true})
  taxCode: number;
  @Column()
  publicKey: string;
  @Column()
  privateKey: string;
  @Column({nullable:true})
  certificates: string;
  @Column({nullable:true})
  phoneNumber: number;
  @Column({ default: false })
  isActive: boolean;
  @Column({ default: 'USER' })
  role: string;
  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updateAt: string;
}
