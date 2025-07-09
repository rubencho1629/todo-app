import { Component, OnInit } from '@angular/core';
import { TaskService } from '@domain/services/task.service';
import { Task } from '@core/models/task.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class TasksPage implements OnInit {
  tasks$: Observable<Task[]>;
  filteredTasks: Task[] = [];

  newTaskTitle = '';
  newTaskCategory = '';
  selectedCategory = '';
  categories: string[] = [];

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
    this.tasks$.subscribe(tasks => {
      this.updateFilteredTasks(tasks);
      this.categories = [...new Set(tasks.map(t => t.category))];
    });
  }

  updateFilteredTasks(tasks: Task[]) {
    this.filteredTasks = this.selectedCategory
      ? tasks.filter(t => t.category === this.selectedCategory)
      : tasks;
  }

  onCategoryChange() {
    this.tasks$.subscribe(tasks => this.updateFilteredTasks(tasks));
  }

  addTask() {
    if (this.newTaskTitle.trim() && this.newTaskCategory.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.newTaskCategory);
      this.newTaskTitle = '';
      this.newTaskCategory = '';
    }
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
