import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GaleriaComponent } from "./components/galeria-component/galeria-component";

@Component({
  selector: 'app-root',
  imports: [ GaleriaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GaleriaApp');
}
