import { Recipe } from './../../section-3/recipes/recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor() {}

  ngOnInit(): void {}
}
