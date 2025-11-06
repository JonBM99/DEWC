import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarrouselComponent } from "./componentes/carrousel-component/carrousel-component";

@Component({
  selector: 'app-root',
  imports: [CarrouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjemploCarrouselApp');
}
