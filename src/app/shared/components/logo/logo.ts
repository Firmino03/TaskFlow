import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class LogoComponent {

  // 'full' = ícone + nome | 'icon' = só o ícone
  @Input() variant: 'full' | 'icon' = 'full';

  // altura em px; a largura acompanha a proporção do SVG
  @Input() height: number = 40;
}
