import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(`${environment.FIREBASE_RECIPE_URL}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    return this.http
      .get<Recipe[]>(
        `${environment.FIREBASE_RECIPE_URL}/recipes.json`
        // {
        //   params: new HttpParams().set('auth', user.token),
        // }
      )
      .pipe(
        //;
        // }),
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }
}
