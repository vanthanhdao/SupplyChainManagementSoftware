interface IDataShipping {
  ShippingMethodID: number;
  ShippingMethodName: string;
  Description: string;
  ShippingCost: number;
  DeliveryTimeEstimate: string;
  MaxWeight: number;
  ApplicableRegion: string;
  PaymentMethod: string;
  Active: boolean;
}
