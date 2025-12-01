import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModel } from "./components/reactive-forms-model/reactive-forms-model";

@Component({
    selector: 'app-root',
    imports: [ReactiveFormsModel],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('EjemploReactiveFormsModel');
}
