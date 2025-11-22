import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaProductosComponent } from "./components/lista-productos-component/lista-productos-component";
import { CarritoComponent } from "./components/carrito-component/carrito-component";

@Component({
  selector: 'app-root',
  imports: [ListaProductosComponent, CarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjercicioCarritoAngular');
}
