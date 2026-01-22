import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private router = inject(Router);

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home'])
  }

  get isLoggedIn(): boolean{
    return !!localStorage.getItem('token'); //la expresion !! convierte un valor en booleano
  }
}
