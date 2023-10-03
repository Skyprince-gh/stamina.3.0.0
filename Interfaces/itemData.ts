export interface ItemData {
  image: string;
  id: string;
  name: string;
  altName: string;
  quantity: number;
  price: number;
  pricingType: string;
  cost: number;
  tax: number;
  sku: string;
  productCode: string;
  location: string;
  isActive: boolean;
  track: boolean;
  description: string;
  brand: string;
  year: number;
  country: string;
  importID: string;
  discount: number;
  tags: string[];
  category: string;
  imported: boolean;
  created: any;
  lastModified: any;
}

export default ItemData