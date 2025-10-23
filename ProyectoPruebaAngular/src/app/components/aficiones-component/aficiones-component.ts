import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; //Para usar el Two wat data binding neceistamos importar FormsModule en el app.module.ts y usar [(ngModel)] en el html
import { AficionInterface } from '../../interfaces/aficion-interface'; //Importamos la interfaz creada
                                            // 
@Component({
  selector: 'app-aficiones-component',
  imports: [FormsModule],
  templateUrl: './aficiones-component.html',
  styleUrl: './aficiones-component.css',
})

export class AficionesComponent {

//arrayAficiones: any[] = []; //Como no se de que tipo son las aficiones, lo dejo como any
arrayAficiones: AficionInterface[] = []; //Usando la interfaz creada

newAficion: AficionInterface = {
  aficion: "",
  nombre: ""
};

constructor() { };

guardarDatos() {
  this.arrayAficiones.push(this.newAficion); //Añadimos la nueva afición al array
  this.newAficion = { //Limpiamos el formulario y crea un nuevo objeto
    aficion: "",
    nombre: "" 
  };

  console.log(this.arrayAficiones);
}

cargarDatos(): string{
  let html: string = "";
  this.arrayAficiones.forEach(afi => {
    html += `<p> La afición es: ${afi.aficion} y el nombre es: ${afi.nombre} </p>`;
  });

  return html;
}
}
