import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export type Actions = SetRecipes;
