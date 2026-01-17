import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ProductList } from './pages/product-list/product-list';
import { ProductInfo } from './pages/product-info/product-info';
import { loginGuardGuard } from './guards/login-guard-guard';

export const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: "home"},
  {path: "home", component: Home},
  {path: "login", component: Login},
  {path: "products", component: ProductList, canActivate: [loginGuardGuard]},
  {path: 'products/product-info/:id', component: ProductInfo, canActivate: [loginGuardGuard]},
  {path: "**", redirectTo: "home"}
];
