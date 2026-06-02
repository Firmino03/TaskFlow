import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class CardComponent {

  @Input() title: string = '';

  @Input() subtitle: string = '';

  @Input() padded: boolean = true;

  @Input() elevated: boolean = false;

  get classes(): string {
    return [
      'card',
      this.elevated ? 'card--elevated' : ''
    ].join(' ');
  }
}