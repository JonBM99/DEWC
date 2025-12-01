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

    getSerieById(_id: string): Iserie | undefined {
        return this.arrSeries.find(s => s._id === _id);

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
            serie._id = crypto.randomUUID();
            this.arrSeries.push(serie);
            this.id++;
        }
    }

    updateSerie(serie: Iserie): void {
        let i = this.arrSeries.findIndex(se => se.id == serie.id);
        serie._id = this.arrSeries[i]._id;
        console.log(serie);

        if (i != -1 && i >= 0 && i < this.arrSeries.length) {
            this.arrSeries.splice(i, 1);
        }

        this.arrSeries.push(serie);

    }

    //Filtros

    getSeriesByFilters(filtro: any): Iserie[] {
        return this.arrSeries.filter(s => s.channel === filtro.channel
            && s.rating >= filtro.raiting
        );
    }

}
