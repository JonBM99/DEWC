import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewUserform } from './pages/new-userform/new-userform';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: Home},
  {path: 'newuser', component: NewUserform},
  {path: '**', redirectTo: 'home'}
];
