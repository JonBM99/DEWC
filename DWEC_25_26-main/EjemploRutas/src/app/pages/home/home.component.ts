import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ServiciosProfesionalesService } from '../../services/servicios-profesionales.service';

@Component({
    selector: 'app-home',
    imports: [RouterLink, FormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {

    miServicio = inject(ServiciosProfesionalesService);
    router = inject(Router);


    getSuscribe(suscribeForm: NgForm) {
        if (suscribeForm.value.email !== "") {
            let email = suscribeForm.value.email;
            this.miServicio.registrarEmail(email);
            this.router.navigate(['/servicios-profesionales'])
            suscribeForm.reset();
        }
        else {
            alert("El campo email debe de estar relleno");
        }
    }

}
