import { Component } from '@angular/core';

@Component({
  selector: 'app-control-flow-if',
  imports: [],
  templateUrl: './control-flow-if.html',
  styleUrl: './control-flow-if.css',
})
export class ControlFlowIf {


  edad: number = 23;

  cambiarEdad($event: any) {
    if ($event.target.value == undefined) {
      this.edad = -1;
    }
    else {
      this.edad = $event.target.value;
    }
  }

}
