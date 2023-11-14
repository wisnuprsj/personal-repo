import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.action';

import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffect {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        return of(set({ value: storedCounter ? +storedCounter : 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select('counter')),
        tap(([action, counter]) => {
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
