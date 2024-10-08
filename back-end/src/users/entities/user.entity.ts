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
  @Column()
  nameCompany: string;
  @Column()
  email: string;
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
  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updateAt: string;
}
