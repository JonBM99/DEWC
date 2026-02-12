import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/landingPage'])
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
