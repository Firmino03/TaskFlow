import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.setSession(response);
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