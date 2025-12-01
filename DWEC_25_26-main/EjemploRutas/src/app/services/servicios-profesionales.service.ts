import { Injectable } from '@angular/core';
import { IServiciosProfesionales } from '../interfaces/iservicios-profesionales.interfaces';
import { SERVICIOSPROFESIONALES } from '../db/serviciosProfesionales.db';

@Injectable({
    providedIn: 'root',
})
export class ServiciosProfesionalesService {

    private arrServiciosProfesionales: IServiciosProfesionales[];
    private arrEmails: string[];

    constructor() {
        this.arrServiciosProfesionales = SERVICIOSPROFESIONALES;
        this.arrEmails = [];
    }

    getAllSp(): IServiciosProfesionales[] {
        return this.arrServiciosProfesionales;
    }

    registrarEmail(email: string) {
        this.arrEmails.push(email);
    }

    getAllEmails(): string[] {
        return this.arrEmails;
    }

    getByUrl(miUrl: string): IServiciosProfesionales {
        let servicioProfesional: IServiciosProfesionales;
        let response = this.arrServiciosProfesionales.find(s => s.url == miUrl);
        if (response != undefined) {
            servicioProfesional = response;
        }
        else {
            servicioProfesional = {
                title: "Servicio no encontrado",
                description: "Contacte con el adminsitrador",
                url: "error"
            }
        }
        return servicioProfesional;
    }

}
