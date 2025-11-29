import { ProductsService } from './../../services/products-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iproduct } from '../../interfaces/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-form-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './products-form-reactive.html',
  styleUrl: './products-form-reactive.css',
})
export class ProductsFormReactive {
  modelForm: FormGroup;
  productsservice = inject(ProductsService);
  router = inject(Router);


  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(280)]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    })
  }

  getDataForm(){
    let product = this.modelForm.value as Iproduct;
    product.id = this.productsservice.getLenght()+1;
    product.active = true;
    this.productsservice.insertProduct(product);
    alert("Producto añadido correctamente");
    this.router.navigate(['products'])
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }
}
