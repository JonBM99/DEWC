import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsList } from './pages/products-list/products-list';
import { ProductsDetails } from './pages/products-details/products-details';
import { ProductsFormTemplate } from './pages/products-form-template/products-form-template';
import { ProductsFormReactive } from './pages/products-form-reactive/products-form-reactive';
import { ProductsFormReactiveEdit } from './pages/products-form-reactive-edit/products-form-reactive-edit';


export const routes: Routes = [
  {path: '', pathMatch :'full', redirectTo: 'home'},
  {path: 'home', component: Home},
  {path: 'products',component: ProductsList},
  {path: 'details/:id',component: ProductsDetails},
  {path: 'newproduct', component: ProductsFormTemplate},
  {path: 'newproductreactive', component: ProductsFormReactive},
  {path: 'editproduct/:id', component: ProductsFormReactiveEdit},
  {path: '**', redirectTo: 'home'}
];
