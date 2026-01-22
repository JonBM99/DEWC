import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductList } from './pages/product-list/product-list';
import { UserList } from './pages/user-list/user-list';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {path:"", pathMatch:'full', redirectTo: "inicio"},
  {path: "inicio", component:LandingPage},
  {path:"login", component: Login},
  {//aqui se haran las guardas despues porque queremos bloquear el acceso a las rutas de debajo
    path:"dashboard", component: Dashboard, canActivate: [loginGuard], children:[
      {path: "", pathMatch: 'full', redirectTo: "productos"},
      {path: "productos", component: ProductList},
      {path: "empleados", component: UserList}
    ]
  },
  {path:"**", redirectTo: "inicio"}
];
