import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { HeroList } from './pages/hero-list/hero-list';
import { HeroView } from './pages/hero-view/hero-view';
import { HeroForm } from './pages/hero-form/hero-form';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path:'login', component:Login},
    {path:'', canActivate:[loginGuard], children:
      [
        {path:'heroes', component: HeroList},
        {path:'heroes-form',component:HeroForm},
        {path:'heroes-form/:id', component: HeroForm},
        {path:'heroes-view/:id', component: HeroView},
      ]
    },
    {path:'**', redirectTo:'home'}
];
