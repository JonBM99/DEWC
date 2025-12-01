import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ICourse } from '../../interfaces/icourse';
import { StudentsServices } from '../../services/students-services';

@Component({
    selector: 'app-filter-form',
    imports: [FormsModule],
    templateUrl: './filter-form.html',
    styleUrl: './filter-form.css',
})
export class FilterForm {

    cursos: ICourse[];
    filterForm: any;
    studentServices = inject(StudentsServices);

    @Output() cursoSeleccionado: EventEmitter<string> = new EventEmitter();

    constructor() {
        this.cursos = [];
    }

    ngOnInit() {
        this.cursos = this.studentServices.getAllCourses();
    }

    getDataFilter(form: any) {
        this.cursoSeleccionado.emit(form.value.curso);
    }

}
