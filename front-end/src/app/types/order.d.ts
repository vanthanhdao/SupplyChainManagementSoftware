interface OrderGroup {
  OrderId: number;
  CreatedAt: string;
  CustomerId: number;
  DeliveryDate: string;
  Note: string;
  PaymentMethod: string;
  ShippingAddress: string;
  ShippingMethodId: number;
  Status: string;
  SubOrderId: number | null;
  TaxRate: number;
  TotalAmount: number;

  // User information
  UserId: number;
  NameCompany: string;
  Email: string;
  PhoneNumber: string;
  TaxCode: string;
  Certificates: string;
  Role: string;

  // Shipping method details
  ApplicableRegion: string;
  DeliveryTimeEstimate: string;
  Description: string;
  MaxWeight: number;
  PaymentMethod: string;
  ShippingCost: number;
  ShippingMethodName: string;
}

interface OrderDetailGroup {
  OrderDetailId: number;
  OrderId: number;
  ProductId: number;
  Quantity: number;
  Subtotal: number;
  Unit: string;
  UnitPrice: number;

  ProductId: number;
  CategoryId: number;
  Description: string;
  Images: string;
  Price: number;
  ProductName: string;
  Specifications: string;

  CategoryId: number;
  CategoryName: string;
  Description: string;
}
