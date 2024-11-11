interface IDataProduct {
    ProductId: number;
    ProductName: string,
    Description:string,
    Price:string,
    Images:string,
    Specifications:boolean,
    CategoryId:number;
    CategoryName:string,
}

interface DetailOrder{
    productId: number;
    productName: string ;
    price:number ;
    categoryId:number;
    categoryName: string;
}