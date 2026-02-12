import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { NinjasList } from './pages/ninjas-list/ninjas-list';
import { NinjaForm } from './pages/ninja-form/ninja-form';
import { NinjaView } from './pages/ninja-view/ninja-view';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landingPage'},
  {path: 'landingPage', component: LandingPage},
  {path: 'login', component: Login},
  {path:'', canActivate: [loginGuard], children:
    [
      {path:'dashboard', component: Dashboard, children:
        [
          {path: 'ninjas', component: NinjasList},
          {path: 'ninja-form', component: NinjaForm},
          {path: 'ninja-form/:id', component: NinjaForm},
          {path: 'ninja-view/:id', component:NinjaView},
        ]
      },
    ]
  },
  {path:'**', redirectTo: 'landingPage'}
];
