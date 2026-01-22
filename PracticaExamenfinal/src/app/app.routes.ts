import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { ProductsPage } from './pages/products-page/products-page';

export const routes: Routes = [
  {path:"", pathMatch:'full', redirectTo:"home"},
  {path:"home", component:Home},
  {path:"login", component:LoginPage},
  {path:"store", component:ProductsPage},
  {path:"**", redirectTo: "home"}
];
