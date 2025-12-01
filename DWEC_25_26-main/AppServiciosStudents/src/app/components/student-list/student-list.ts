import { Component, inject } from '@angular/core';
import { StudentsServices } from '../../services/students-services';
import { IStudent } from '../../interfaces/istudent';
import { StudentCard } from "../student-card/student-card";
import { FilterForm } from "../filter-form/filter-form";

@Component({
    selector: 'app-student-list',
    imports: [StudentCard, FilterForm],
    templateUrl: './student-list.html',
    styleUrl: './student-list.css',
})
export class StudentList {


    //Inyeccion de dependencia del Servicio --> Equivalente al Auto-Wired
    studentServices = inject(StudentsServices);

    arrStudents: IStudent[];

    constructor() {
        this.arrStudents = [];
    }

    ngOnInit(): void {
        this.arrStudents = this.studentServices.getAll();
    }

    getCourse($event: string) {
        this.arrStudents = this.studentServices.getStudentByCourse($event);
    }
}
