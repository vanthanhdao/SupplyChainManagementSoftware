import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nameCompany: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  taxCode: number;
  @Column()
  walletAdress: string;
  @Column()
  certificates: string;
  @Column()
  phoneNumber: number;
  @Column({ default: false })
  isActive: boolean;
  @Column({ default: 'USER_CUSTOMER' })
  role: string;
}
