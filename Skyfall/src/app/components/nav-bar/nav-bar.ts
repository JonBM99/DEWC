import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken'); //la expresion !! convierte un valor en booleano
  }

  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/home']);
  }
}
