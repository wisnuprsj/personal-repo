import { Component, Injectable } from '@angular/core';
import { WikipediaResponse, WikipediaService } from './wikipedia.service';
import { Subscription } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class Car {
//   color = 'red';
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pages: any[] = [];

  // constructor(private wikiService: WikipediaService, private car: Car) {}

  constructor(private wikiService: WikipediaService) {}

  onTerm(term: string) {
    // console.log('I am the app and here is the term', term);
    // console.log('My car has a color of', this.car.color);
    // const results = this.wikiService.search(term);
    // console.log(results);

    this.wikiService.search(term).subscribe((pages: any) => {
      this.pages = pages;
    });
  }
}
