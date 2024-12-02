interface IDataProduct {
  ProductId: number;
  ProductName: string;
  Description: string;
  Price: string;
  Images: string;
  Specifications: boolean;
  CategoryId: number;
  CategoryName: string;
}

interface DetailOrder {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  categoryName: string;
  quantity: number;
  money: number;
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
  companyName: string;
  companyAddress: string;
  deliveryDate: DateTime;
  shippingVia: string;
  terms: string;
  shipTo: string;
  seller: string;
  notes: string;
}
