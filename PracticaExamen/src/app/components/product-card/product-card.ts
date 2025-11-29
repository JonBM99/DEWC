import { Iproduct } from '../../interfaces/iproduct';
import { ProductsService } from './../../services/products-service';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  productsservice = inject(ProductsService);
  router = inject(Router)
  @Input() miProduct!: Iproduct;

  seeDetails(miProduct: Iproduct){
    this.router.navigate(['/details', miProduct.id])
  }

  deleteProduct(miProduct: Iproduct){
    this.productsservice.deleteById(miProduct.id);
  }
}
