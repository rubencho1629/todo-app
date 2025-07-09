import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.loadTasksFromStorage();
  }

  private async loadTasksFromStorage() {
    const storedTasks = await this.localStorage.loadTasks();
    this.tasks.next(storedTasks);
  }

  private saveToStorage() {
    this.localStorage.saveTasks(this.tasks.getValue());
  }

  addTask(title: string, category: string) {
    const newTask: Task = {
      id: uuid(),
      title,
      completed: false,
      category,
    };
    const current = this.tasks.getValue();
    this.tasks.next([...current, newTask]);
    this.saveToStorage();
  }

  toggleTask(id: string) {
    const updated = this.tasks.getValue().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasks.next(updated);
    this.saveToStorage();
  }

  deleteTask(id: string) {
    const updated = this.tasks.getValue().filter(task => task.id !== id);
    this.tasks.next(updated);
    this.saveToStorage();
  }

  getTasksByCategory(category: string): Task[] {
    return this.tasks.getValue().filter(task => task.category === category);
  }

  getAllTasks(): Task[] {
    return this.tasks.getValue();
  }
}
