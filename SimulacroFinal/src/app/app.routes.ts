import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { loginGuardGuard } from './guards/login-guard-guard';
import { UserList } from './pages/user-list/user-list';
import { UserForm } from './pages/user-form/user-form';
import { UserView } from './pages/user-view/user-view';
import { adminGuardGuard } from './guards/admin-guard-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: '', canActivate: [loginGuardGuard], children:
    [
      {path: 'dashboard', component: Dashboard, children:
        [
          {path: 'users', component: UserList},
          {path: 'user-form', component: UserForm},
          {path: 'user-form/:_id', component: UserForm, canActivate: [adminGuardGuard]},
          {path: 'user-view/:_id', component: UserView, canActivate: [adminGuardGuard]},
        ]
      },
    ]
  },
  {path:'**', redirectTo: 'login'}
];
