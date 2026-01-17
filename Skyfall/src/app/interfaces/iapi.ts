import { IProduct } from './iproduct';
export interface IApi {
  total: number;
  skip: number;
  limit: number;
  products: IProduct[];
}
