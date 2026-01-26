import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { Itask } from '../interface/itask';
import { lastValueFrom } from 'rxjs';
import { Istats } from '../interface/istats';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {

  private httpClient = inject(HttpClient);
  private baseUrl: string = '/api';

  getStats(): Promise<Istats> {
  return this.getAllTasks().then(tasks => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'done').length; // ← Cambia 'completed' por 'done'
    const pending = total - completed;
    return {total, completed, pending} as Istats;
  })
}

  deleteAllCompletedTask(): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/tasks/completed`));
  }

  getAllTasks(): Promise<Itask[]> {
    return lastValueFrom(this.httpClient.get<Itask[]>(`${this.baseUrl}/tasks`));
  }

  createTask(task: Itask): Promise<Itask> {
    return lastValueFrom(this.httpClient.post<Itask>(`${this.baseUrl}/tasks`, task));
  }

  getTaskById(id: number): Promise<Itask> {
    return lastValueFrom(this.httpClient.get<Itask>(`${this.baseUrl}/tasks/${id}`));
  }

  updateTaskById(task: Itask): Promise<Itask> {
    return lastValueFrom(this.httpClient.put<Itask>(`${this.baseUrl}/tasks/${task.id}`, task));
  }

  deleteTaskById(id: number): Promise<Itask> {
    return lastValueFrom(this.httpClient.delete<Itask>(`${this.baseUrl}/tasks/${id}`));
  }

  updateStatus(id: number, status: string): Promise<any> {
    return lastValueFrom(this.httpClient.patch(`${this.baseUrl}/tasks/${id}/status`, { status }));
  }
}
