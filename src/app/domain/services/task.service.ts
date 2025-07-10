import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks.next(JSON.parse(saved));
  }

  private persist(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTask(title: string, category: string) {
    const task: Task = { id: uuid(), title, category, completed: false };
    const updated = [...this.tasks.getValue(), task];
    this.tasks.next(updated);
    this.persist(updated);
  }

  deleteTask(id: string) {
    const updated = this.tasks.getValue().filter(t => t.id !== id);
    this.tasks.next(updated);
    this.persist(updated);
  }

  toggleTask(id: string) {
    const updated = this.tasks.getValue().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasks.next(updated);
    this.persist(updated);
  }
  getAllTasks(): Task[] {
    return this.tasks.getValue();
  }
  updateTask(id: string, title: string, category: string) {
    const updated = this.tasks.getValue().map(t =>
      t.id === id ? { ...t, title, category } : t
    );
    this.tasks.next(updated);
    this.persist(updated);
  }
}
