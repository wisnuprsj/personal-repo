import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

// interface Car {
//   year: number;
//   color: string;
//   running: boolean;
//   make: {
//     name: string;
//     dateCreated: number;
//   };
// }

// const observable = new Observable<Car>((obs) => {
//   obs.next({
//     year: 2024,
//     color: 'red',
//     running: true,
//     make: {
//       name: 'Honda',
//       dateCreated: 2010,
//     },
//   });
// }).pipe(pluck('make', 'name'));

// observable.subscribe((value) => {
//   console.log(value);
// });

export interface WikipediaResponse {
  query: {
    search: {
      ns: number;
      title: string;
      pageid: number;
      size: number;
      wordcount: number;
      snippet: string;
      timestamp: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http
      .get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          utf8: '1',
          srsearch: term,
          origin: '*',
        },
      })
      .pipe(pluck('query', 'search'));
  }
}
