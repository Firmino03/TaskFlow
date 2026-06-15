import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class ModalComponent {

  @Input() open: boolean = false;

  @Input() title: string = '';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';


  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.closed.emit(); 
  }
  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}