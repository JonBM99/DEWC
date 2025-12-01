import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/istudent';
import { ICourse } from '../interfaces/icourse';
import { ALUMNOS } from '../db/students.db';
import { CURSOS } from '../db/courses.db';

@Injectable({
    providedIn: 'root',
})
export class StudentsServices {

    private arrEstudiantes: IStudent[];
    private arrCursos: ICourse[];

    private id: number;

    constructor() {
        this.arrEstudiantes = ALUMNOS;
        this.arrCursos = CURSOS;
        this.id = ALUMNOS.length + 1;
    }

    getAll(): IStudent[] {
        return this.arrEstudiantes;
    }

    getById(id: number): IStudent | undefined {
        return this.arrEstudiantes.find(student => student.id == id);
    }

    addStudent(student: IStudent) {
        if (!this.arrEstudiantes.includes(student)) {
            student.id = this.id;
            this.arrEstudiantes.push(student);
            this.id++;
        }
    }

    getAllCourses(): ICourse[] {
        return this.arrCursos;
    }

    getStudentByCourse(course: string): IStudent[] {
        return this.arrEstudiantes.filter(student => student.curso.includes(course));
    }

    //Ejemplo de estudiar
    removeStudentbyId(studentRemove: IStudent): void {
        this.arrEstudiantes = this.arrEstudiantes.filter(student => student.id !== studentRemove.id);
    }
}
