import { CarritoServices } from './../../services/carrito-services';
import { Component, inject } from '@angular/core';
import { ProductoComponent } from "../producto-component/producto-component";
import { IProducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-lista-productos-component',
  imports: [ProductoComponent],
  templateUrl: './lista-productos-component.html',
  styleUrl: './lista-productos-component.css',
})
export class ListaProductosComponent {
  ServicioCarrito = inject(CarritoServices);

  listaProductos: IProducto[];
  currency: string;
  cantidad!: number;

  constructor() {
    this.currency = '';
    this.listaProductos = [];
  }

  ngOnInit():void {
    this.listaProductos = this.ServicioCarrito.getAllProductos();
    this.currency = this.ServicioCarrito.getCurrency();
    this.cantidad = this.ServicioCarrito.getCantidad();
  }
}
