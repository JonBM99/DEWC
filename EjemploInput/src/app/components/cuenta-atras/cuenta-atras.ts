import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cuenta-atras',
  imports: [],
  templateUrl: './cuenta-atras.html',
  styleUrl: './cuenta-atras.css',
})
export class CuentaAtras {

  @Input() numeroInicial: number = 100;
  private isRunning: boolean = false;
  intervalo: any;

  comenzar(): void{
    if(!this.isRunning){
      this.intervalo = setInterval(() => {
        if(this.numeroInicial > 0){
          this.numeroInicial--;
        } else{
          clearInterval(this.intervalo);
        }
      }, 1000);
      this.isRunning = true;
    }
  }

}
