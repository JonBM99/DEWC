import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentList } from "./components/student-list/student-list";
import { StudentForm } from "./components/student-form/student-form";
import { FilterForm } from "./components/filter-form/filter-form";

@Component({
    selector: 'app-root',
    imports: [StudentList, StudentForm],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('AppServiciosStudents');
}
