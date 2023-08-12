import { ShoppingListService } from './../../shopping-list/services/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}
  private recipes: Recipe[] = [
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('Buns', 2),
      ]
    ),
  ];

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number) {
    console.log(`recipe : ${this.recipes[index]}`);
    return this.recipes[index];
  }
}
