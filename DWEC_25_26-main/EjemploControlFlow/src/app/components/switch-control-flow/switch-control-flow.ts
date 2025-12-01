import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-control-flow',
  imports: [],
  templateUrl: './switch-control-flow.html',
  styleUrl: './switch-control-flow.css',
})
export class SwitchControlFlow {
  roles: string[];
  role: string;

  constructor() {
    this.roles = ["admin", "editor", "suscriptor", "otros"];
    this.role = this.roles[0];
  }

}
