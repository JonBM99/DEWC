import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsServices } from '../../services/students-services';
import { IStudent } from '../../interfaces/istudent';

@Component({
    selector: 'app-student-form',
    imports: [ReactiveFormsModule],
    templateUrl: './student-form.html',
    styleUrl: './student-form.css',
})
export class StudentForm {
    registerStudents: FormGroup;
    studentServices = inject(StudentsServices);

    constructor() {
        this.registerStudents = new FormGroup({
            nombre: new FormControl(null, [Validators.required]),
            edad: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
            email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
            curso: new FormControl(null, [Validators.required])
        }, []);
    }

    getDataForm() {
        let student = this.registerStudents.value as IStudent;
        console.log(student);
        this.studentServices.addStudent(student)
        this.registerStudents.reset();
    }

}
