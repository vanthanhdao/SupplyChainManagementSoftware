import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblSCMS_ShippingMethods')
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  ShippingMethodID: number;

  @Column()
  ShippingMethodName: string;

  @Column({ type: 'nvarchar', length: 4000 })
  Description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  ShippingCost: number;

  @Column()
  DeliveryTimeEstimate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  MaxWeight: number;

  @Column()
  ApplicableRegion: string;

  @Column()
  PaymentMethod: string;

  @Column({ default: 'True' })
  Active: string;

  @CreateDateColumn()
  CreatedAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;
}
