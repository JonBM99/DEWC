import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { AppComponent } from './pages/app-component/app-component';
import { ProductDetails } from './pages/product-details/product-details';
import { ProductForm } from './pages/product-form/product-form';
import { ProductFilter } from './pages/product-filter/product-filter';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'home'},
    {path: 'home',component: AppComponent},
    {path: 'products',component: ProductList},
    {path: 'details/:id', component: ProductDetails},
    {path: 'addproduct', component: ProductForm},
    {path: 'addproduct/:id', component: ProductForm},
    {path: 'filter', component: ProductFilter},
    {path: '**', redirectTo: 'home'}
];
