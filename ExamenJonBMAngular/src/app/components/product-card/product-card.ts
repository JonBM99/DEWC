import { Router } from '@angular/router';
import { ProductServices } from './../../services/product-services';
import { Component, inject, Input } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  productServices = inject( ProductServices);
  router = inject(Router);
  @Input() miProduct!: Iproduct;

  seeDetails(miProduct:Iproduct){
    this.router.navigate(['/details', miProduct.id]);
  }

  deleteProduct(miProduct: Iproduct){
    this.productServices.deleteById(miProduct.id);
  }
}
