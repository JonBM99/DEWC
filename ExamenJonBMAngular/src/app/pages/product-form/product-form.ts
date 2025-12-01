import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServices } from '../../services/product-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../interfaces/iproduct';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  modelForm: FormGroup;
  productsservice = inject(ProductServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNew: boolean;


  constructor(){
    this.modelForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(280)]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      active: new FormControl(null, [Validators.required]),
    })
    this.isNew = true;
  }

  getDataForm(){
    let product = this.modelForm.value as Iproduct;
    if(this.isNew){
      product.id = uuidv4();
      product.active = true;
      this.productsservice.insertProduct(product);
      alert("Producto añadido correctamente");
    }
    else{
      this.productsservice.updateProducto(product);
    }

    this.router.navigate(['products'])
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) => {
      let id: string = params.id;
      if(id != undefined){
        let miProduct = this.productsservice.getProductById(id);
        if(miProduct != undefined){
          this.isNew = false;
          this.modelForm = new FormGroup({
            id: new FormControl(miProduct.id, []),
            name: new FormControl(miProduct.name, [Validators.required, Validators.minLength(3)]),
            description: new FormControl(miProduct.description, [Validators.required, Validators.maxLength(280)]),
            price: new FormControl(miProduct.price, [Validators.required, Validators.min(0), Validators.max(1000)]),
            category: new FormControl(miProduct.category, [Validators.required]),
            image: new FormControl(miProduct.image, [Validators.required]),
            active: new FormControl(miProduct.active, [Validators.required]),
          },[]);
        } else {
          alert("No se encuentra el producto en nuestra tienda");
        }
      }
    });
  }
}
