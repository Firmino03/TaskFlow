import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',      
  standalone: true,             // componente independente, não precisa de módulo
  imports: [CommonModule],      // CommonModule dá acesso ao *ngIf, *ngFor, etc.
  templateUrl: './button.html',
  styleUrl: './button.scss'    
})
export class ButtonComponent {

  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Input() disabled: boolean = false;

  @Input() fullWidth: boolean = false;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get classes(): string {
    return [
      'btn',                          
      `btn--${this.variant}`,         
      `btn--${this.size}`,            
      this.fullWidth ? 'btn--full' : '' 
    ].join(' ');                  
  }
}