import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardNumber: string = '';
  @Input() name: string = '';
  @Input() expiration: string = '';
}
