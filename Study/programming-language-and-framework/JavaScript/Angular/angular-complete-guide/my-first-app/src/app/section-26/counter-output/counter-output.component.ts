import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectDoubleCount } from '../store/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = store.select('counter');
    this.doubleCount$ = store.select(selectDoubleCount);
  }
}
