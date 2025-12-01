import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlFlowIf } from "./components/control-flow-if/control-flow-if";
import { SwitchControlFlow } from "./components/switch-control-flow/switch-control-flow";
import { ForControlFlow } from "./components/for-control-flow/for-control-flow";

@Component({
  selector: 'app-root',
  imports: [ControlFlowIf, SwitchControlFlow, ForControlFlow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjemploControlFlow');
  ejemploActivo: string;

  constructor() {
    this.ejemploActivo = "for";
  }
}
