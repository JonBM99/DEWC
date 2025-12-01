import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeporteInterfaces } from '../../interfaces/deporte-interfaces';

@Component({
  selector: 'app-cuenta-atras-component',
  imports: [],
  templateUrl: './cuenta-atras-component.html',
  styleUrl: './cuenta-atras-component.css',
})
export class CuentaAtrasComponent {

  @Input() deporte: DeporteInterfaces;
  @Input() color: string;
  private isRunning: boolean = false;
  intervalo: any;

  @Output() cuentaAtrasTerminada: EventEmitter<string> = new EventEmitter();
  @Output() cuentaAtrasComenzada: EventEmitter<string> = new EventEmitter();

  constructor() {
        this.deporte = {
        nombre: "Predeterminado",
        valor: 0,
        tipo: "Reglamentario"
    }

    this.color = "green";
  }

  comenzar(): void {
    if (this.deporte != undefined) {
      if (!this.isRunning) {
        this.cuentaAtrasComenzada.emit("grey");
        this.intervalo = setInterval(() => {
          if (this.deporte.valor > 0) {
            this.deporte.valor--;
          }
          else {
            clearInterval(this.intervalo);
            this.cuentaAtrasTerminada.emit(this.color);
          }
        }, 1000);
        this.isRunning = true;
      }
    }
    
  }

}
