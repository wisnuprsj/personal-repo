import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClassDirective } from './class.directive';
import { TimesDirective } from './times.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ClassDirective, TimesDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentPage: number = 0;
  changePage(page: number) {
    this.currentPage = page;
  }
  images = [
    {
      title: 'At the Beach',
      url: 'https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8',
    },
    {
      title: 'At the Fountain',
      url: 'https://unsplash.com/photos/a-water-fountain-surrounded-by-hedges-and-trees-n31H4TfhVJA',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
    {
      title: 'At the Galaxy',
      url: 'https://unsplash.com/photos/a-very-large-galaxy-in-the-middle-of-the-night-sky-4z6TIH6D_pw',
    },
  ];

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }
}
