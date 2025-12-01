import { Component, inject } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductServices } from '../../services/product-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  miProducto!: Iproduct;
  productService = inject(ProductServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);


  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) =>{
      let id = params.id;
      if(id != undefined){
        let response = this.productService.getProductById(id);
        if(response != undefined){
          this.miProducto = response;
        }
      }
    })
  }

  editProduct(miProducto: Iproduct){
    this.router.navigate(['/addproduct', miProducto.id])
  }
}
