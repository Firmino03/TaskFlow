import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project.model';
import { ButtonComponent } from '../../shared/components/button/button';
import { CardComponent } from '../../shared/components/card/card';
import { BadgeComponent } from '../../shared/components/badge/badge';
import { ModalComponent } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent, BadgeComponent, ModalComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
  
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  loading = false;
  showCreateModal = false;
  createForm: FormGroup;

  constructor(
    private authService: AuthService,
    public projectService: ProjectService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      status: ['active']
    });
  }
  
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onCreateProject(): void {
    if (this.createForm.invalid) return;

    const data = {
      ...this.createForm.value,
      createdAt: new Date().toISOString()
    };

    this.projectService.createProject(data).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.createForm.reset({ status: 'active' });
        this.loadProjects();
      }
    });
  }

  onDeleteProject(id: number): void {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;

    this.projectService.deleteProject(id).subscribe({
      next: () => this.loadProjects()
    });
  }

  getStatusVariant(status: string): 'success' | 'warning' | 'default' {
    const map: Record<string, 'success' | 'warning' | 'default'> = {
      active: 'success',
      paused: 'warning',
      done: 'default'
    };
    return map[status] ?? 'default';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      active: 'Em andamento',
      paused: 'Pausado',
      done: 'Concluído'
    };
    return map[status] ?? status;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}