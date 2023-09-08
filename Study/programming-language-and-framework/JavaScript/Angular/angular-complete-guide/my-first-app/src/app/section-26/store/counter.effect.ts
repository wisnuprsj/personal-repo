import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment } from './counter.action';

import { tap } from 'rxjs';

@Injectable()
export class CounterEffect {
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        tap((action) => {
          localStorage.setItem('count', action.value.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
