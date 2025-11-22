import { CarritoServices } from './../../services/carrito-services';
import { Component, inject, Input} from '@angular/core';
import { IProducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-producto-component',
  imports: [],
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.css',
})
export class ProductoComponent {
  CarritoServices = inject(CarritoServices);
  @Input() producto!: IProducto;
  @Input() currency!: string;
  cantidad: number = 0;

  btnSumar():void { //funcion del boton sumar producto para eventbinding
    this.cantidad++;
    let productoComprado ={
      sku: this.producto.sku,
      title: this.producto.title,
      price: Number(this.producto.price),
      cantidad: this.cantidad
    };
    this.CarritoServices.agregarProducto(productoComprado); //llamada al service para funcion agregarProducto
  }

  btnRestar():void {  //funcion del boton restar producto para eventbinding
    if(this.cantidad > 0){
      this.cantidad--;
    }
    let productoComprado ={
      sku: this.producto.sku,
      title: this.producto.title,
      price: Number(this.producto.price),
      cantidad: this.cantidad
    };
    this.CarritoServices.eliminarProducto(productoComprado);  //llamada al service para funcion eliminarProducto
  }

}
