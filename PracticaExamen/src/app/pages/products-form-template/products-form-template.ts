import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../services/products-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-form-template',
  imports: [FormsModule, RouterLink],
  templateUrl: './products-form-template.html',
  styleUrl: './products-form-template.css',
})
export class ProductsFormTemplate {
  productsservice = inject(ProductsService);

  getDataForm(miFormulario: NgForm){ //Creo que esto es un triple de cuidado para rellenar campos con lo que viene del formulario y algo que le pongo yo por defecto pero funciona asi que no lo pienso tocar mas
    let id = this.productsservice.getLenght();
    let newId = id + 1;
    let product: Iproduct = {
      id: newId,
      name: miFormulario.value.name,
      description: miFormulario.value.description,
      price: miFormulario.value.price,
      category: miFormulario.value.category,
      image: miFormulario.value.image,
      active: true //pongo por defecto true para que aparezca despues en /products porque si lo pongo como false se añadira pero no saldra
    }
    this.productsservice.insertProduct(product);
    alert("Producto insertado correctamente");
    miFormulario.reset;

    /*
    El contenido del getDataForm normal sin este triple seria asi:
      let product: Iproduct = miformulario.value as IProducto;
      this.productsservice.insertProduct(product);
      miFormulario.reset;
    */
  }
}
