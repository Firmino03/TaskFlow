import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

      login(credentials: LoginCredentials): Observable<AuthResponse> {
      return this.http.get<User[]>(
      `${this.apiUrl}/users?email=${credentials.email}`
      ).pipe(
      map(users => {
      const user = users[0];

      if (!user || (user as any).password !== credentials.password) {
        throw new Error('Credenciais inválidas');
      }

      const response: AuthResponse = {
        user: { id: user.id, name: user.name, email: user.email },
        token: `fake-jwt-token-${user.id}`
      };

        this.setSession(response);
        return response;
      })
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        this.setSession(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('tf_token');
    localStorage.removeItem('tf_user');

    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('tf_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem('tf_token', response.token);
    localStorage.setItem('tf_user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('tf_user');
    return stored ? JSON.parse(stored) : null;
  }
}