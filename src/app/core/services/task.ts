import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskData } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  // busca todas as tarefas de um projeto específico
  // o ?projectId= filtra direto na API do json-server
  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?projectId=${encodeURIComponent(projectId)}`);
  }

  createTask(data: CreateTaskData): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data);
  }

  // Partial<Task> permite atualizar só o campo status
  // sem precisar mandar o objeto inteiro
  updateTask(id: string, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, data);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}