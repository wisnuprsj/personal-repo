import { Component } from '@angular/core';

@Component({
  selector: 'app-views-home',
  templateUrl: './views-home.component.html',
  styleUrl: './views-home.component.css',
})
export class ViewsHomeComponent {
  stats = [
    {
      value: 22,
      label: '# of Users',
    },
    {
      value: 900,
      label: 'Revenue',
    },
    {
      value: 50,
      label: 'Reviews',
    },
  ];

  items = [
    {
      image: 'assets/images/couch.jpeg',
      title: 'Couch',
      description: 'This is a fantastic couch to sit on',
    },
    {
      image: 'assets/images/dresser.jpeg',
      title: 'Dresser',
      description: 'This is a great dresser',
    },
  ];
}
