import { Component, inject } from '@angular/core';
import { Iserie } from '../../interfaces/iserie.interface';
import { SerieService } from '../../services/serie-service';
import { SeriesCard } from '../../components/series-card/series-card';


@Component({
    selector: 'app-series-list',
    imports: [SeriesCard],
    templateUrl: './series-list.html',
    styleUrl: './series-list.css',
})
export class SeriesList {

    seriesArray: Iserie[];
    seriesService = inject(SerieService);

    constructor() {
        this.seriesArray = [];
    }

    ngOnInit(): void {
        this.seriesArray = this.seriesService.getAllSeries();
    }




}
