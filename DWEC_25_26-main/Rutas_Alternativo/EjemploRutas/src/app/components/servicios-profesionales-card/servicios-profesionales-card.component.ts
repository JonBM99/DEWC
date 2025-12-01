import { Component, Input } from '@angular/core';
import { IServiciosProfesionales } from '../../interfaces/iservicios-profesionales.interfaces';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-servicios-profesionales-card',
    imports: [RouterLink],
    templateUrl: './servicios-profesionales-card.component.html',
    styleUrl: './servicios-profesionales-card.component.css',
})
export class ServiciosProfesionalesCardComponent {

    @Input() miServicioProfesional !: IServiciosProfesionales;

}
