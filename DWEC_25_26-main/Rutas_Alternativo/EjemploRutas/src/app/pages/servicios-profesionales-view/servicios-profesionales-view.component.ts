import { Component, inject } from '@angular/core';
import { IServiciosProfesionales } from '../../interfaces/iservicios-profesionales.interfaces';
import { ServiciosProfesionalesService } from '../../services/servicios-profesionales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-servicios-profesionales-view',
    imports: [],
    templateUrl: './servicios-profesionales-view.component.html',
    styleUrl: './servicios-profesionales-view.component.css',
})
export class ServiciosProfesionalesViewComponent {

    miServicioProfesional !: IServiciosProfesionales;
    miServicio = inject(ServiciosProfesionalesService);
    activatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            // recoger el parametro
            let url: string = params.id;
            let miId: number = Number(params.id);
            if (url != undefined) {
                // Pedir al servicio el servicioProfesional
                let response = this.miServicio.getByUrl(url);
                response = this.miServicio.getById(miId);
                if (response != undefined) {
                    // Rellenar mi propiedad miServicio
                    this.miServicioProfesional = response;
                    if (response.url == "error") {
                        //Gestionar el caso como quiera
                    }
                }
            }
        });
    }


}
