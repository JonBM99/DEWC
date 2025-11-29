import { Component, inject } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../services/products-service';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  productsArray: Iproduct[];
  productsservice = inject(ProductsService);

  constructor(){
    this.productsArray = [];
  }
  ngOnInit(): void{
    this.productsArray = this.productsservice.getAllproducts();
  }
}
