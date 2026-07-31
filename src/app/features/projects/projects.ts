import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}