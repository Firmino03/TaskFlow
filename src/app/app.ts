import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button';
import { BadgeComponent } from './shared/components/badge/badge';
import { CardComponent } from './shared/components/card/card';
import { ModalComponent } from './shared/components/modal/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent, CardComponent, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {

  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}