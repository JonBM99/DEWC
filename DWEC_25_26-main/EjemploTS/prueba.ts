import { Size } from "./Size";
import { IPersona } from "./IPersona";
import { Persona } from "./Persona";

let size: Size = Size.L;
console.log("Talla: " + size);

const sumar = function(a: number, b: number): number {
    return a + b;
}

const sumarFlecha = (a: number, b: number) => (a + b);   


const saludar = function (nombre: string): void {
    console.log("Hola " + nombre);
}

const saludarFlecha = (nombre: string): void => {
    console.log("Hola " + nombre);
}

let r = true
let r2 = false

const miPersona: IPersona = {
    nombre: "Anuar",
    edad: 22,
    isDeveloper: true,
    talla: Size.L
}

const miPersona2 : IPersona = {
    nombre: "Pepe",
    edad: 34,
    isDeveloper: false
};

const miPersona3 = new Persona("Laura", 29, true);
miPersona3.getNombre();