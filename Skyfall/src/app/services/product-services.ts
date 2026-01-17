import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { IApi } from '../interfaces/iapi';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private baseUrl: string = 'https://dummyjson.com/products';
  httpClient = inject(HttpClient);

  constructor() {}

  async getAllProducts(page: number = 1): Promise<IApi> {

  const limit = 10; // products per page
  const skip = (page - 1) * limit;

  const response = await lastValueFrom(
    this.httpClient.get<IApi>(
      `${this.baseUrl}?limit=${limit}&skip=${skip}`
    )
  );

  return response;
}


  async getProductById(id: number): Promise<IProduct> {
    return lastValueFrom(this.httpClient.get<IProduct>(this.baseUrl + '/' + id));
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    return lastValueFrom(this.httpClient.post<IProduct>(this.baseUrl, product));
  }

  async updateProduct(product: IProduct): Promise<IProduct> {
    return lastValueFrom(this.httpClient.put<IProduct>(`${this.baseUrl}/${product.id}`, product));
  }

  async deleteProduct(id: number): Promise<IProduct> {
    return lastValueFrom(this.httpClient.delete<IProduct>(`${this.baseUrl}/${id}`));
  }

  async deleteProductById(id: number): Promise<IProduct> {
    return lastValueFrom(this.httpClient.delete<IProduct>(`${this.baseUrl}/${id}`));
  }
}
