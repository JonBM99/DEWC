export class Persona {
    
    private nombre: string;
    edad: number;
    isDeveloper: boolean;

    constructor(nombre: string, edad: number, isDeveloper: boolean) {
        this.nombre = nombre;
        this.edad = edad;
        this.isDeveloper = isDeveloper;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public saludar(): void {
        console.log("Hola, me llamo " + this.nombre);
    }

    
    

}