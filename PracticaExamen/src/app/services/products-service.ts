import { Iproduct } from './../interfaces/iproduct';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private arrProducts : Iproduct[];

  constructor(){
    this.arrProducts = [];

    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data =>{
        data.forEach((element:Iproduct) => {
          this.arrProducts.push(element);
        });
      })
  }

  getAllproducts(){
    return this.arrProducts;
  }

  getById(miId: number): Iproduct | undefined{
    return this.arrProducts.find(s => s.id === miId);
  }

  deleteById(id: number):void{
    let i = this.arrProducts.findIndex(p =>p.id === id);
    if(i != -1 && i>=0 && i < this.arrProducts.length){
      this.arrProducts.splice(i,1);
    }
  }

  getLenght():number{
    return this.arrProducts.length;
  }

  insertProduct(product: Iproduct){
    return this.arrProducts.push(product);
  }

  getProductById(id:string): Iproduct | undefined{
    return this.arrProducts.find(s => s.id === Number(id));
  }

  updateProducto(product: Iproduct){
    let i = this.arrProducts.findIndex(p => p.id == product.id);
    product.id = this.arrProducts[i].id;
    if(i != -1 && i>=0 && i < this.arrProducts.length){
      this.arrProducts.splice(i, 1);
    }
    this.arrProducts.push(product);
  }

  //Ejemplo de filtro
  getProductByFilter(filtro: any): Iproduct[]{
    return this.arrProducts.filter(p => p.category === filtro.category);
  }
}
