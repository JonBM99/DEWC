import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj-componet',
  imports: [],
  templateUrl: './reloj-componet.html',
  styleUrl: './reloj-componet.css'
})
export class RelojComponet {

  horas: number;
  minutos: number;
  color: string;

  constructor() {
    this.horas = 17;
    this.minutos = 30;
    this.color = "gris"

    console.log(this.saludar("constructor"));
  }

  ngOnInit(): void {
    console.log(this.saludar("ngOnInit"));

    setTimeout(() => {
      this.ngOnDestroy();
    }, 7000);
  }


  ngAfterViewInit(): void{
    console.log(this.saludar("ngAfterViewInit"));
  }

  private saludar(ubicacion: string): string {
    return "Estoy hablando desde " + ubicacion;
  }

  ngOnDestroy(): void {
    console.log(this.saludar("Soy el destroyer"));
    this.color = "rojo";
  }


}
