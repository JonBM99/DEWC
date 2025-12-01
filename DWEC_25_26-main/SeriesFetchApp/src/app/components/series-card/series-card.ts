import { Component, inject, Input } from '@angular/core';
import { Iserie } from '../../interfaces/iserie.interface';
import { SerieService } from '../../services/serie-service';

@Component({
    selector: 'app-series-card',
    imports: [],
    templateUrl: './series-card.html',
    styleUrl: './series-card.css',
})
export class SeriesCard {

    seriesService = inject(SerieService);
    @Input() miSerie!: Iserie;


    deleteSerie(serie: Iserie) {
        this.seriesService.deleteByTitle(serie.title);
    }


}
