import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CuentaAtras } from './components/cuenta-atras/cuenta-atras';

@Component({
  selector: 'app-root',
  imports: [CuentaAtras],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjemploInput');

  primerContador: number = 23;
  segundoContador: number = 7;
  tercerContador: number = 13;

}
