import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input('content') content!: {
    image: string;
    title: string;
    subtitle: string;
    desc: string;
  };
}
