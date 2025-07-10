import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../../domain/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tasks.page.html',
})
export class TasksPage {
  newTitle = '';
  newCategory = '';
  selectedCategory = '';
  editingTask: Task | null = null;
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => {
      this.filteredTasks = this.applyFilter(tasks);
    });
  }

  get allCategories(): string[] {
    const all = this.taskService.getAllTasks().map((t: Task) => t.category);
    return [...new Set<string>(all)];
  }

  applyFilter(tasks: Task[]): Task[] {
    return this.selectedCategory
      ? tasks.filter(t => t.category === this.selectedCategory)
      : tasks;
  }

  onCategoryChange() {
    this.taskService.tasks$.subscribe(tasks => {
      this.filteredTasks = this.applyFilter(tasks);
    });
  }

  addTask() {
    if (!this.newTitle.trim() || !this.newCategory.trim()) return;
    this.taskService.addTask(this.newTitle, this.newCategory);
    this.newTitle = '';
    this.newCategory = '';
  }

  toggle(task: Task) {
    this.taskService.toggleTask(task.id);
  }

  remove(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  edit(task: Task) {
    this.editingTask = { ...task };
  }

  saveEdit() {
    if (!this.editingTask) return;
    this.taskService.updateTask(
      this.editingTask.id,
      this.editingTask.title,
      this.editingTask.category
    );
    this.editingTask = null;
  }

  cancelEdit() {
    this.editingTask = null;
  }
}
