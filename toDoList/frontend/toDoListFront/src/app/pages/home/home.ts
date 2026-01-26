import { Component, inject, OnInit } from '@angular/core';
import { Itask } from '../../interface/itask';
import { Istats } from '../../interface/istats';
import { TaskServices } from '../../services/task-services';
import { FormsModule } from '@angular/forms';
import { Task } from "../../components/task/task";


@Component({
  selector: 'app-home',
  imports: [FormsModule, Task],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  tasks: Itask[] = [];
  stats: Istats = { total: 0, completed: 0, pending: 0 };
  tasksServices = inject(TaskServices);
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  constructor() {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
  this.tasks = await this.tasksServices.getAllTasks();
  const total = this.tasks.length;
  const completed = this.tasks.filter(t => t.status === 'done').length; // ← Cambia 'completed' por 'done'
  const pending = total - completed;
  this.stats = { total, completed, pending };
  console.log('Stats actualizadas:', this.stats);
}

  async addTask() {
    if (!this.newTaskTitle.trim()) return;
    const task: Itask = {
      id: 0, // el backend asignará el id
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      status: 'pending'
    };
    await this.tasksServices.createTask(task);
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    await this.loadTasks();
  }

  async deleteTask(id: number) {
    await this.tasksServices.deleteTaskById(id);
    await this.loadTasks();
  }

  async toggleStatus(task: Itask) {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await this.tasksServices.updateStatus(task.id, newStatus);
    await this.loadTasks();
  }

  async deleteCompleted() {
    await this.tasksServices.deleteAllCompletedTask();
    await this.loadTasks();
  }
}
