import { CarritoServices } from './../../services/carrito-services';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-carrito-component',
  imports: [],
  templateUrl: './carrito-component.html',
  styleUrl: './carrito-component.css',
})
export class CarritoComponent {
  CarritoServices = inject(CarritoServices);
  productosEnCarrito: any[];
  producto:any;
  currency: string;
  precioTotal: number;


  constructor(){
    this.productosEnCarrito = [];
    this.producto = {
      title: '',
      price: '',
      sku : '',
      cantidad: 0
    }

    this.currency = '';
    this.precioTotal = 0;
  }

  ngOnInit(){
    this.productosEnCarrito = this.CarritoServices.getproductosEnCarrito();
    this.currency = this.CarritoServices.getCurrency();
    this.precioTotal = this.CarritoServices.getPrecioTotal();
  }
}
