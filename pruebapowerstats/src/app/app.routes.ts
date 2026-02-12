import { Routes } from '@angular/router';
import { Heroesform } from './pages/heroesform/heroesform';

export const routes: Routes = [
    {path: '', redirectTo: 'form', pathMatch: 'full'},
    {path: 'form', component: Heroesform},
    {path:'**', redirectTo: 'form'}
];
