import { IProducto } from '../interfaces/iproducto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoServices {
  private listaProductos: IProducto[];
  private currency: string;
  private precioTotal: number;
  private cantidad: number;
  private productosEnCarrito:any[];

  constructor() {
    this.currency = '';
    this.listaProductos = [];
    //fetch para recibir datos de la api
    fetch("http://localhost:8080/api/carrito")
      .then((response) => response.json())
      .then(data => {
        this.currency = data.currency;
        data.products.forEach((producto: IProducto) => {
        this.listaProductos.push(producto);
        });
      });

    this.precioTotal = 0;
    this.cantidad = 0;
    this.productosEnCarrito = [];
  }

  getAllProductos(): IProducto[] {
    return this.listaProductos;
  }
  getCurrency(): string {
    return this.currency;

  }
  getCantidad(): number {
    return this.cantidad;
  }

  agregarProducto(productoComprado: any) {  //funcion para agregar producto al carrito
    let index = this.productosEnCarrito.findIndex(p => p.sku === productoComprado.sku); //buscamos si el producto ya está en el carrito
    if (index !== -1) {
      this.productosEnCarrito[index].cantidad = productoComprado.cantidad; //si el producto ya está en el carrito, actualizamos la cantidad
    } else {
      this.productosEnCarrito.push(productoComprado); //si el producto no está en el carrito lo agregamos
    }
    this.precioTotal += productoComprado.price; //actualizamos el precio total
  }

  eliminarProducto(productoComprado: any) {
    let index = this.productosEnCarrito.findIndex(p => p.sku === productoComprado.sku); //buscamos el producto en el carrito
    if (index !== -1) {
      if (productoComprado.cantidad === 0) {  //si esta en el carrito y la cantidad es 0, eliminamos el producto del carrito
        this.productosEnCarrito.splice(index, 1);
      } else {
        this.productosEnCarrito[index].cantidad = productoComprado.cantidad;  //si la cantidad es mayor que 0, actualizamos la cantidad
      }
    }
    this.precioTotal -= productoComprado.price; //actualizamos el precio total
  }

  getPrecioTotal(){
    return this.precioTotal;
  }

  getproductosEnCarrito(){
    return this.productosEnCarrito;
  }
}

