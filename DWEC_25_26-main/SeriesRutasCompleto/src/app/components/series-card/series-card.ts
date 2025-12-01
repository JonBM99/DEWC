import { Component, inject, Input } from '@angular/core';
import { Iserie } from '../../interfaces/iserie.interface';
import { SerieService } from '../../services/serie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-series-card',
    imports: [],
    templateUrl: './series-card.html',
    styleUrl: './series-card.css',
})
export class SeriesCard {

    seriesService = inject(SerieService);
    router = inject(Router);
    @Input() miSerie!: Iserie;


    deleteSerie(serie: Iserie) {
        this.seriesService.deleteByTitle(serie.title);
    }

    seeDetails(serie: Iserie) {
        this.router.navigate(['/serie', serie._id]);

    }


}
