import { Component, signal } from '@angular/core';
import { CuentaAtrasComponent } from "./components/cuenta-atras-component/cuenta-atras-component";
import { DeporteInterfaces } from './interfaces/deporte-interfaces';

@Component({
  selector: 'app-root',
  imports: [CuentaAtrasComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('EjemploInput');

  primerContador: number = Math.random() * 100;
  segundoContador: number = 7;
  tercerContador: number = Math.random() * 100;

  miDeporte: DeporteInterfaces;
  miDeporte2: DeporteInterfaces;
  miDeporte3: DeporteInterfaces;

  arrayColores: string [] = ["red", "blue", "green", "gold"];
  color: string;
  colorI: string;

  constructor() {
    this.color = "";
    this.colorI = "";
    this.miDeporte = {
      nombre: "Futbol",
      valor: 9,
      tipo: "reglamentario"
    };

    this.miDeporte2 = {
      nombre: "Baloencesto",
      valor: 6,
      tipo: "reglamentario"
    };

    this.miDeporte3 = {
      nombre: "F1",
      valor: 10,
      tipo: "maximo"
    };
  }

  terminar($event: string) {
    this.color = `background-color:${$event}`;
    console.log(this.color);
  }

  comenzar($event: string) {
    this.colorI = `background-color:${$event}`;
    console.log(this.colorI);
  }

}
