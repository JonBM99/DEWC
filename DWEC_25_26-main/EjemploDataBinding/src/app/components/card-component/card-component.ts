import { Component } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css'
})
export class CardComponent {
  private nombre: string;
  private apellidos: string;
  edad: number;
  colorBackGround: string;
  isImportant = false;
  texto: string;

  constructor(){
    this.nombre = "Pepe";
    this.apellidos = "Grande Lopez";
    this.edad = 33;
    this.colorBackGround = "rojo";
    this.isImportant = true;
    this.texto = "hola";
    
  }

  getNombreCompleto(): string {
    return this.nombre + ' ' + this.apellidos;
    //`${this.nombre} ${this.apellidos}`;
  }

  cargarTexto(event : any):void {
    this.texto = event.target.value;
  }



}
