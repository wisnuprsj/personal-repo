import { Component } from '@angular/core';

@Component({
  selector: 'app-mods-home',
  templateUrl: './mods-home.component.html',
  styleUrl: './mods-home.component.css',
})
export class ModsHomeComponent {
  showModal: boolean = false;
  items = [
    { title: 'Why is the sky blue?', content: 'The sky is blue because it is' },
    {
      title: 'What does an orange taste like?',
      content: 'An orange tastes like an apple',
    },
    {
      title: 'What color is that cat ?',
      content: 'The color is like an apple',
    },
  ];

  onClick() {
    this.showModal = !this.showModal;
  }
}
