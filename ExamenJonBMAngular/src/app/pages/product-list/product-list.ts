import { Component, inject } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductServices } from '../../services/product-services';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productsArray: Iproduct[];
  productsServices = inject(ProductServices);

  constructor(){
    this.productsArray = [];
  }

  ngOnInit(): void{
    this.productsArray = this.productsServices.getAllProducts();
  }
}
