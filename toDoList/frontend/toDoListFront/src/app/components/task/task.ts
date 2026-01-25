import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Itask } from '../../interface/itask';
import { TaskServices } from '../../services/task-services';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {

  @Input() task!: Itask;
  @Output() onDeleted = new EventEmitter<number>();
  @Output() onToggled = new EventEmitter<Itask>();
  taskServices = inject(TaskServices);

  async toggleStatus(){
    const newStatus = this.task.status === 'done' ? 'pending' : 'done';
    await this.taskServices.updateStatus(this.task.id, newStatus);
    this.task.status = newStatus;
    console.log('Toggle - Nuevo estado:', newStatus);
    this.onToggled.emit({ ...this.task, status: newStatus });
  }
  async deleteTask(){
    await this.taskServices.deleteTaskById(this.task.id);
    this.onDeleted.emit(this.task.id);
  }
}
