import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'login', component: Login},
  {path:'home', component: HomeComponent, canActivate: [authGuard]},
  {path:'**', redirectTo:'login'}
]
