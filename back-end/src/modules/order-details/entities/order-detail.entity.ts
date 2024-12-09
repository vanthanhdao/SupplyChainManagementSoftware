import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tblSCMS_OrderDetails')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  OrderDetailId: number;

  @Column()
  OrderId: number;

  @Column()
  ProductId: number;

  @Column()
  Quantity: number;

  @Column()
  Unit: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  UnitPrice: number;

  // @Column({
  //   generatedType: 'STORED',
  //   asExpression: 'Quantity * UnitPrice',
  // })
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  Subtotal: number;
}
