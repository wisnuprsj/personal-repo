import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  posts = [
    {
      image: '../assets/tree.jpeg',
      title: 'Neat Tree',
      subtitle: '@nature',
      desc: 'Saw this awesome tree during my hike today',
    },
    {
      image: '../assets/mountain.jpeg',
      title: 'Snowy Mountain',
      subtitle: '@mountainlover',
      desc: 'Here is a picture of a snowy mountain',
    },
    {
      image: '../assets/biking.jpeg',
      title: 'Mountain Biking',
      subtitle: '@biking12222',
      desc: 'I did some biking today',
    },
  ];
}
