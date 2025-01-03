interface IDataProduct {
  ProductId: number;
  ProductName: string;
  Description: string;
  Price: string;
  Images: string;
  Specifications: boolean;
  CategoryId: number;
}

interface DetailOrder {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  categoryName: string;
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
