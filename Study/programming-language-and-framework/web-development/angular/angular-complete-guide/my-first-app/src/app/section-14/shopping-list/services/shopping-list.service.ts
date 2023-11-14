// import { EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  //   addedIngredients = new EventEmitter<Ingredient>();
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
    new Ingredient('Garlic', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
