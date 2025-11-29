import { Component, inject } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-details',
  imports: [RouterLink],
  templateUrl: './products-details.html',
  styleUrl: './products-details.css',
})
export class ProductsDetails {
  miProducto!: Iproduct;
  productsservice = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) =>{
      let miId = Number(params.id);
      if(miId != undefined){
        let response = this.productsservice.getById(miId);
        if(response != undefined){
          this.miProducto = response;
        }
      }
    })
  }

  editProduct(miProducto: Iproduct){
    this.router.navigate(['/editproduct', miProducto.id]);
  }
}
