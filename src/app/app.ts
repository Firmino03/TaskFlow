import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}