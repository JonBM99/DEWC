import { Injectable } from '@angular/core';
import { IWorker } from '../interfaces/iworker.interface';

@Injectable({
    providedIn: 'root',
})
export class WorkerServices {

    private arrayWorkers: IWorker[];

    constructor() {
        this.arrayWorkers = [];
    }

    getAllWorkers(): IWorker[] {
        return this.arrayWorkers;
    }

    insertWorker(worker: IWorker) {
        this.arrayWorkers.push(worker);
    }

}
