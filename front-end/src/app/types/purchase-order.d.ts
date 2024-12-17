interface IDataPurchaseOrder {
  deliveryDate: string;
  customerId: number | null;
  shippingAddress: string | null;
  paymentMethod: string;
  shippingMethodId: number;
  totalAmount: number;
  taxRate: number;
  status?: string;
  note: string;
}

interface IDataPurchaseOrderDetail {
  orderId: number;
  productId: number;
  quantity: number;
  unit: string;
  unitPrice: number;
  subTotal: number;
  subOrderId: number | null;
}

interface IDataOrder {
  OrderId: number;
  DeliveryDate: string;
  ShippingAddress: string;
  PaymentMethod: string;
  Note: string;
  TotalAmount: number;
  TaxRate: number;
  Status: string;
  ShippingCost: number;
  CustomerId: number;
}
