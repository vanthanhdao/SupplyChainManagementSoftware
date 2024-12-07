interface IDataPurchaseOrder {
  deliveryDate: string;
  customerId: number;
  shippingAddress: string;
  paymentMethod: string;
  shippingMethodId: number;
  totalAmount: number;
  taxRate: number;
  status?: string;
  note: string;
}
