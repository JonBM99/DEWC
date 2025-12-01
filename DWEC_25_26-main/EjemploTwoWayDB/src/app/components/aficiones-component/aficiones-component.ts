import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AficionInterface } from '../../interfaces/aficion-interface';

@Component({
  selector: 'app-aficiones-component',
  imports: [FormsModule],
  templateUrl: './aficiones-component.html',
  styleUrl: './aficiones-component.css',
})
export class AficionesComponent {

  //Para usar el Two way data binding necesitamos importar la libreria de FormsModule y la directiva ngModel
  arrAficiones: AficionInterface[] = [];

  newAficion: AficionInterface = {
    aficion: "",
    nombre: ""
  }

  constructor() { }
  
  guardarDatos() {
    this.arrAficiones.push(this.newAficion);
    this.newAficion = {
      aficion: "",
      nombre: ""
    }

    console.log(this.arrAficiones);
  }

  cargarDatos() : string {
    let html: string = "";
    this.arrAficiones.forEach(afi => {
        html += `<p>${afi.aficion} - ${afi.nombre}</p>`
    });

    return html;
  }

}
