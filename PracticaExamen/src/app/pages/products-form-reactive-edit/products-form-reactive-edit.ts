import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-products-form-reactive-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './products-form-reactive-edit.html',
  styleUrl: './products-form-reactive-edit.css',
})
export class ProductsFormReactiveEdit {
  modelForm: FormGroup;
  productsservice = inject(ProductsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor(){
    this.modelForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(280)]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      active: new FormControl(null, [Validators.required]),
    }, [])
  }

  getDataForm(){
    let product = this.modelForm.value as Iproduct;
    this.productsservice.updateProducto(product);
    this.modelForm.reset();
    this.router.navigate(['products'])
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) =>{
      let id: string = params.id;
      console.log(id);
      if(id != undefined){
        let miProducto = this.productsservice.getProductById(id);
        console.log(miProducto);
        if(miProducto != undefined){
          this.modelForm = new FormGroup({
            id: new FormControl(miProducto.id,[]),
            name: new FormControl(miProducto.name, [Validators.required, Validators.minLength(3)]),
            description: new FormControl(miProducto.description, [Validators.required, Validators.maxLength(280)]),
            price: new FormControl(miProducto.price, [Validators.required, Validators.min(0), Validators.max(1000)]),
            category: new FormControl(miProducto.category, [Validators.required]),
            image: new FormControl(miProducto.image, [Validators.required]),
            active: new FormControl(miProducto.active, [Validators.required]),
          },[]);
        } else{
          alert("No se encuentra el producto en nuestro stock")
        }
      }
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }
}
