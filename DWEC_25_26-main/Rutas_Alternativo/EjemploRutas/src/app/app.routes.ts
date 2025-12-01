import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosProfesionalesComponent } from './pages/servicios-profesionales/servicios-profesionales.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Page404Componet } from './pages/page404/page404.componet';
import { ServiciosProfesionalesViewComponent } from './pages/servicios-profesionales-view/servicios-profesionales-view.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    {
        // En el componente dashboard tiene que tener un router-outlet
        path: 'dashboard', component: DashBoardComponent, children: [
            { path: 'servicios-profesionales', component: ServiciosProfesionalesComponent },
            {
                path: 'servicios-profesionales/:id', component
                    : ServiciosProfesionalesViewComponent
            },
        ]
    },
    { path: 'contacto', component: ContactComponent },
    // { path: '**', component: Page404Componet }
    { path: '**', redirectTo: 'home' }

];
