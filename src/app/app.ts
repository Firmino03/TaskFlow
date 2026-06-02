import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button';
import { BadgeComponent } from './shared/components/badge/badge';
import { CardComponent } from './shared/components/card/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}