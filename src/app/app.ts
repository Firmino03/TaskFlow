import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button';
import { BadgeComponent } from './shared/components/badge/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}