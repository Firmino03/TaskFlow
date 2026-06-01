import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss'
})
export class BadgeComponent {

  @Input() variant: 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';

  @Input() dot: boolean = false;

  get classes(): string {
    return [
      'badge',
      `badge--${this.variant}`
    ].join(' ');
  }
}