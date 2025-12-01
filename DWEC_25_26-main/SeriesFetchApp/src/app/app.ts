import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeriesList } from "./components/series-list/series-list";
import { SerieForm } from "./components/serie-form/serie-form";

@Component({
    selector: 'app-root',
    imports: [SeriesList, SerieForm],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('SeriesFetchApp');
}
