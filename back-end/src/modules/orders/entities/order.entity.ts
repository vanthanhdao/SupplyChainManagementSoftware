import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tblSCMS_Orders')
export class Orders {
  @PrimaryGeneratedColumn()
  OrderId: number;

  @Column()
  DeliveryDate: string;

  @Column()
  CustomerId: number;

  @Column({ type: 'nvarchar', length: 500 })
  ShippingAddress: string;

  @Column({ type: 'nvarchar', length: 255 })
  PaymentMethod: string;

  @Column()
  ShippingMethodId: number;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  TaxRate: number;

  @Column({ type: 'nvarchar', length: 50, default: 'Created' })
  Status: string;

  @Column({ type: 'nvarchar', length: 4000 })
  Note: string;

  @CreateDateColumn()
  CreatedAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;
}
