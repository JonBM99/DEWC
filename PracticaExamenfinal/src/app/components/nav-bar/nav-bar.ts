import { Component, inject} from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);

  isToken: boolean;

  constructor() {
    this.isToken = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.isToken = true;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isToken = false;
    this.router.navigate(['/home']);
  }

}
