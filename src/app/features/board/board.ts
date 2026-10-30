import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../core/services/task';
import { Task } from '../../core/models/task.model';
import { ButtonComponent } from '../../shared/components/button/button';
import { BadgeComponent } from '../../shared/components/badge/badge';
import { ModalComponent } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, ButtonComponent, BadgeComponent, ModalComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class BoardComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  projectId!: string;
  loading = false;
  showCreateModal = false;
  createForm: FormGroup;

  // cada coluna tem sua própria lista de tarefas
  // o CDK drag-drop trabalha com arrays separados
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority: ['medium']
    });
  }

  ngOnInit(): void {
    // ActivatedRoute lê os parâmetros da URL
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (tasks) => {
        // separa as tarefas em três arrays pelo status
        this.todoTasks = tasks.filter(t => t.status === 'todo');
        this.inProgressTasks = tasks.filter(t => t.status === 'in-progress');
        this.doneTasks = tasks.filter(t => t.status === 'done');
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  // esse método é chamado pelo Angular CDK quando
  // o usuário solta uma tarefa em uma nova posição
  onTaskDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // descobre o novo status baseado no id do container
    const newStatus = this.getStatusFromContainerId(event.container.id);
    const task = event.container.data[event.currentIndex];

    // salva o novo status na API
    this.taskService.updateTask(task.id, { status: newStatus }).subscribe();
  }

  getStatusFromContainerId(id: string): 'todo' | 'in-progress' | 'done' {
    const map: Record<string, 'todo' | 'in-progress' | 'done'> = {
      'todo-list': 'todo',
      'in-progress-list': 'in-progress',
      'done-list': 'done'
    };
    return map[id] ?? 'todo';
  }

  onCreateTask(): void {
    if (this.createForm.invalid) return;

    const data = {
      ...this.createForm.value,
      projectId: this.projectId,
      status: 'todo' as const,
      createdAt: new Date().toISOString()
    };

    this.taskService.createTask(data).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.createForm.reset({ priority: 'medium' });
        this.loadTasks();
      }
    });
  }

  onDeleteTask(id: string, status: string): void {
    if (!confirm('Deletar esta tarefa?')) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks()
    });
  }

  getPriorityVariant(priority: string): 'danger' | 'warning' | 'info' {
    const map: Record<string, 'danger' | 'warning' | 'info'> = {
      high: 'danger',
      medium: 'warning',
      low: 'info'
    };
    return map[priority] ?? 'info';
  }

  getPriorityLabel(priority: string): string {
    const map: Record<string, string> = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    };
    return map[priority] ?? priority;
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}