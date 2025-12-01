import { Component, inject } from '@angular/core';
import { IServiciosProfesionales } from '../../interfaces/iservicios-profesionales.interfaces';
import { ServiciosProfesionalesService } from '../../services/servicios-profesionales.service';
import { ServiciosProfesionalesCardComponent } from "../../components/servicios-profesionales-card/servicios-profesionales-card.component";

@Component({
    selector: 'app-servicios-profesionales',
    imports: [ServiciosProfesionalesCardComponent],
    templateUrl: './servicios-profesionales.component.html',
    styleUrl: './servicios-profesionales.component.css',
})
export class ServiciosProfesionalesComponent {

    miServicio = inject(ServiciosProfesionalesService);
    arrServiciosPro: IServiciosProfesionales[];

    constructor() {
        this.arrServiciosPro = [];
    }

    ngOnInit(): void {
        this.arrServiciosPro = this.miServicio.getAllSp();
    }

}
