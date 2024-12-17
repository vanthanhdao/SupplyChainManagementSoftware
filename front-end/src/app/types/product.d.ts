interface IDataProduct {
  ProductId: number;
  ProductName: string;
  Description: string;
  Price: string;
  Images: string;
  Specifications: string;
  CategoryId: number;
  CategoryName: string;
  Type: string;
}

interface DetailOrder {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  categoryName: string;
  quantity: number;
  money: number;
  unit: string;
  images: string;
  specifications: string;
}

interface IUpdateDataProduct {
  productId: number;
  productName: string;
  description: string;
  price: string;
  images: string;
  specifications: boolean;
  categoryId: number;
  categoryName: string;
  isNew: boolean;
  active: string;
}

interface IInputPurchaseOrder {
  companyName: string | null;
  companyAddress: string | null;
  deliveryDate: DateTime;
  shippingVia: string;
  shippingViaId: number;
  terms: string;
  shipTo: string | null;
  seller: string;
  notes: string;
  taxRate: number;
}
