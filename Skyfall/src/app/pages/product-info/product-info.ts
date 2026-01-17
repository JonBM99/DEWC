import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductServices } from '../../services/product-services';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-info',
  imports: [RouterLink],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {

  product!: IProduct;
  productServices = inject(ProductServices);
  activateRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async params => {
      const productId = params['id'];
      if(productId != undefined) {
        let response = await this.productServices.getProductById(productId);
        if(response != undefined){
          this.product = response;
        }
      }
    });
  }
}
