import { Routes } from '@angular/router';
import { SeriesList } from './pages/series-list/series-list';
import { HomeComponent } from './pages/home/home.component';
import { SerieForm } from './pages/serie-form/serie-form';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'series', component: SeriesList },
    { path: 'nuevaserie', component: SerieForm },
    { path: 'serie/:_id', component: SerieForm },
    { path: '**', redirectTo: 'home' }

];
