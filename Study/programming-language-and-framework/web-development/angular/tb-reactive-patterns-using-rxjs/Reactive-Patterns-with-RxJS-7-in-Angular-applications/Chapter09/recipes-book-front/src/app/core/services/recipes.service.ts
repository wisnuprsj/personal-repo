import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { shareReplay, switchMap } from 'rxjs/operators';
const BASE_PATH = environment.basePath
const REFRESH_INTERVAL = 50000;
const timer$ = timer(0, REFRESH_INTERVAL);

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  recipes$ = this.getRecipesList();

  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }

  saveRecipe(formValue: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${BASE_PATH}/recipes/save`, formValue);
  }

  getRecipesList(): Observable<Recipe[]> {
    if (!this.recipes$) {
      return timer$.pipe(
      switchMap(_ => this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)),
      /**Popular way using shareReplay**/
      shareReplay(1)
      /**Recommended way using RxJS7+
      share({
        connector : () => new ReplaySubject(),
        resetOnRefCountZero : true,
        restOnComplete: true,
        resetOnError: true
      }) */
    );
    }
    return this.recipes$;
  } 


}

