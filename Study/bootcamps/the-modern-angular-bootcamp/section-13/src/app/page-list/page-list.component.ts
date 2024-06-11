import { Component, Input } from '@angular/core';
import { WikipediaResponse } from '../wikipedia.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.css',
})
export class PageListComponent {
  @Input('pages') pages: any[] = [];
}
