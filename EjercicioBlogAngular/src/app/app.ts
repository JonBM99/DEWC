import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar-component/navbar-component";
import { FormComponent } from "./components/form-component/form-component";
import { NewsComponent } from "./components/news-component/news-component";
import { FooterComponent } from "./components/footer-component/footer-component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FormComponent, NewsComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjercicioBlogAngular');
}
