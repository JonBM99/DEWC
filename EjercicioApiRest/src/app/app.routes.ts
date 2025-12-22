import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserForm } from './pages/user-form/user-form';
import { UserView } from './pages/user-view/user-view';

export const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component: Home},
  {path: 'user-view', component: UserView},
  {path: 'user-view/:_id', component: UserView},
  {path:'user-form', component: UserForm},
  {path:'user-form/:_id', component: UserForm},
  {path:'**', redirectTo:'home'}
];
