import { createSelector } from '@ngrx/store';

export const selectCount = (state: { counter: number }) => {
  return state.counter;
};
export const selectDoubleCount = createSelector(
  selectCount,
  (state: number) => 2 * state
);
