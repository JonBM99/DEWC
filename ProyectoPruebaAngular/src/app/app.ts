import { Component, signal } from '@angular/core';
import { AficionesComponent } from './components/aficiones-component/aficiones-component';

@Component({
  selector: 'app-root',
  imports: [AficionesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProyectoPruebaAngular');
}
