import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormTemplateComponent } from "./component/form-template-component/form-template-component";

@Component({
    selector: 'app-root',
    imports: [FormTemplateComponent],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('EjemploFormTemplate');
}
