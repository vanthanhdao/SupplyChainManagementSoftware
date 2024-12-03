import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tblSCMS_OrderDetails')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  unitPrice: number;

  @Column({
    generatedType: 'STORED',
    asExpression: 'quantity * unitPrice',
  })
  subtotal: number;
}
