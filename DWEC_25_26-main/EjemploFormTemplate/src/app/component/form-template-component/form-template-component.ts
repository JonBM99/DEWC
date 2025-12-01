import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IWorker } from '../../interfaces/iworker.interface';
import { WorkerServices } from '../../services/worker.services';

@Component({
    selector: 'app-form-template-component',
    imports: [FormsModule],
    templateUrl: './form-template-component.html',
    styleUrl: './form-template-component.css',
})
export class FormTemplateComponent {

    arrayWorkers: IWorker[];
    workerServices = inject(WorkerServices);

    constructor() {
        this.arrayWorkers = [];
    }

    ngOnInit(): void {
        this.arrayWorkers = this.workerServices.getAllWorkers();
    }

    getDataForm(miFormulario: NgForm) {
        let trabajador: IWorker = miFormulario.value as IWorker;
        console.log(trabajador);
        //this.arrayWorkers.push(trabajador);
        this.workerServices.insertWorker(trabajador);
        miFormulario.reset();
    }

}
