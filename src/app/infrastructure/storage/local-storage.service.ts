import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../core/models/task.model';

const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private storage: Storage) {}

  async saveTasks(tasks: Task[]): Promise<void> {
    await this.storage.set(TASKS_KEY, tasks);
  }

  async loadTasks(): Promise<Task[]> {
    return (await this.storage.get(TASKS_KEY)) || [];
  }
}
