import { Injectable } from '@angular/core';
import { Iproduct } from './../interfaces/iproduct';
import { producerAccessed } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private arrProducts: Iproduct[];

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

  getAllProducts(){
    return this.arrProducts;
  }

  getProductById(id:string): Iproduct | undefined{
    return this.arrProducts.find(s => s.id === id);
  }

  deleteById(id:string): void{
    let i = this.arrProducts.findIndex(p => p.id === id);
    if(i != -1 && i>=0 && i < this.arrProducts.length){
      this.arrProducts.splice(i,1);
    }
  }

  insertProduct(product: Iproduct){
    return this.arrProducts.push(product);
  }

  updateProducto(product: Iproduct){
    let i = this.arrProducts.findIndex(p => p.id === product.id);
    product.id = this.arrProducts[i].id;
    if(i != -1 && i>=0 && i < this.arrProducts.length){
      this.arrProducts.splice(i, 1);
    }
    this.arrProducts.push(product);
  }

  getProductByCategory(category: string): Iproduct[]{
    return this.arrProducts.filter(p => p.category === category);
  }

  getProductByActive(active: string): Iproduct[]{
    return this.arrProducts.filter(p => p.active === Boolean(active));
  }

  getProductByName(name: string): Iproduct[]{
    return this.arrProducts.filter(p => p.name.split(' ')); //No funciona pero supongo que divides el nombre en un array de strings y lo comparas con el name
  }

  getProductByPrice(price: number): Iproduct[]{  //No funciona pero la idea seria asi
    let arrP = this.arrProducts;
    if(price < 10){
      arrP = this.arrProducts.filter(p => p.price<10)
    } else if(price<30){
      arrP = this.arrProducts.filter(p => p.price<30)
    } else if(price<50){
      arrP = this.arrProducts.filter(p => p.price<50)
    }
    return arrP;
  }
}
