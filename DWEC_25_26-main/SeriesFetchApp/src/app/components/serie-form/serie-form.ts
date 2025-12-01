import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iserie } from '../../interfaces/iserie.interface';
import { SerieService } from '../../services/serie-service';

@Component({
    selector: 'app-serie-form',
    imports: [ReactiveFormsModule],
    templateUrl: './serie-form.html',
    styleUrl: './serie-form.css',
})
export class SerieForm {

    serieForm: FormGroup;
    serieService = inject(SerieService);

    constructor() {
        this.serieForm = new FormGroup({
            id: new FormControl(null, []),
            title: new FormControl(null, [Validators.required]),
            creator: new FormControl(null, [Validators.required]),
            rating: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
            dates: new FormControl(null, [Validators.required]),
            image: new FormControl(null, [Validators.required]),
            channel: new FormControl(null, [Validators.required]),
        }, []);

    }

    getDataForm() {
        let serie = this.serieForm.value as Iserie;
        serie.id = -1;
        this.serieService.insertSerie(serie);
        this.serieForm.reset();
    }


}
