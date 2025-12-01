import { Component, Input } from '@angular/core';
import { IStudent } from '../../interfaces/istudent';

@Component({
    selector: 'app-student-card',
    imports: [],
    templateUrl: './student-card.html',
    styleUrl: './student-card.css',
})
export class StudentCard {
    @Input() miAlumno!: IStudent;
}
