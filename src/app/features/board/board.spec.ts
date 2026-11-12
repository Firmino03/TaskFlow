import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BoardComponent } from './board';
import { Task } from '../../core/models/task.model';
import { environment } from '../../../environments/environment';

const task: Task = {
  id: 'abc',
  projectId: 'p1',
  title: 'Criar tela',
  description: 'desc',
  status: 'todo',
  priority: 'low',
  createdAt: '2026-01-01T00:00:00.000Z'
};

describe('BoardComponent (edição de tarefa)', () => {
  let http: HttpTestingController;
  let board: BoardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    });
    http = TestBed.inject(HttpTestingController);
    board = TestBed.createComponent(BoardComponent).componentInstance;
    board.projectId = 'p1';
  });

  it('abre o modal em modo edição com os dados da tarefa', () => {
    board.openEditModal(task);

    expect(board.showTaskModal).toBe(true);
    expect(board.isEditing).toBe(true);
    expect(board.taskForm.value).toEqual({
      title: 'Criar tela',
      description: 'desc',
      priority: 'low'
    });
  });

  it('abre o modal vazio em modo criação', () => {
    board.openEditModal(task);
    board.openCreateModal();

    expect(board.isEditing).toBe(false);
    expect(board.taskForm.value.title).toBe('');
    expect(board.taskForm.value.priority).toBe('medium');
  });

  it('salva só os campos editáveis via PATCH e atualiza o card', () => {
    const t = { ...task };
    board.openEditModal(t);
    board.taskForm.patchValue({ title: 'Novo título', priority: 'high' });

    board.onSubmitTask();

    const req = http.expectOne(`${environment.apiUrl}/tasks/abc`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      title: 'Novo título',
      description: 'desc',
      priority: 'high'
    });
    req.flush({});

    expect(t.title).toBe('Novo título');
    expect(t.priority).toBe('high');
    expect(board.showTaskModal).toBe(false);
    expect(board.isEditing).toBe(false);
  });

  it('não envia nada se o formulário for inválido', () => {
    board.openEditModal(task);
    board.taskForm.patchValue({ title: 'ab' });

    board.onSubmitTask();

    http.expectNone(`${environment.apiUrl}/tasks/abc`);
  });
});