import { Component } from '@angular/core';
import { TaskService } from '../../domain/services/task.service';
import { Task } from '../../core/models/task.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
                                  
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class TasksPage {
  tasks$: Observable<Task[]>;
  newTaskTitle = '';
  newTaskCategory = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
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
