import { Injectable } from '@angular/core';
import { Iserie } from '../interfaces/iserie.interface';

@Injectable({
    providedIn: 'root',
})
export class SerieService {
    private arrSeries: Iserie[];
    private id: number;

    constructor() {
        this.arrSeries = [];
        this.id = 20;

        fetch("https://peticiones.online/api/series")
            .then(response => response.json())
            .then(datos => {
                datos.forEach((element: any) => {
                    let serie = element as Iserie;
                    this.arrSeries.push(serie);
                });
            });
    }

    getAllSeries(): Iserie[] {
        return this.arrSeries;
    }

    //Metodo para eliminar series
    deleteByTitle(title: string): void {
        // this.arrSeries = this.arrSeries.filter(serie => serie.title !== title);
        // console.log(this.arrSeries);

        let i = this.arrSeries.findIndex(serie => serie.title == title);
        if (i != -1 && i >= 0 && i < this.arrSeries.length) {
            this.arrSeries.splice(i, 1);
        }
    }

    //Metodo para insertar serie
    insertSerie(serie: Iserie): void {
        if (!this.arrSeries.includes(serie) && serie != null) {
            serie.id = this.id;
            this.arrSeries.push(serie);
            this.id++;
        }
    }

    //Filtros

}
