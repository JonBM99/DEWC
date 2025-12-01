import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContadorComponet } from "./components/contador-componet/contador-componet";
import { RelojComponet } from "./components/reloj-componet/reloj-componet";

@Component({
  selector: 'app-root',
  imports: [ContadorComponet, RelojComponet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EntrenamientoComponentes');
}
