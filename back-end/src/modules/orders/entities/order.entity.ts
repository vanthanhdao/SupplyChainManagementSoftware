import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tblSCMS_Orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  deliveryDate: string;

  @Column()
  customerId: number;

  @Column({ type: 'nvarchar', length: 500 })
  shippingAddress: string;

  @Column({ type: 'nvarchar', length: 255 })
  paymentMethod: string;

  @Column({ type: 'nvarchar', length: 500 })
  shippingMethod: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  taxRate: number;

  @Column({ type: 'nvarchar', length: 50, default: 'New' })
  status: string;

  @Column({ type: 'nvarchar', length: 4000 })
  note: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
