import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { Recipe } from '../core/model/recipe.model';
import { Subscription, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes$ = this.service.recipes$;
  recipesSubs!: Subscription;
  recipes!: Recipe[];
  destroy$ = new Subject<void>();

  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    // this.recipesSubs = this.service.getRecipes().subscribe((result) => {
    //   this.recipes = result;
    // });
    // this.service
    //   .getRecipes()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((result) => {
    //     this.recipes = result;
    //   });
  }

  ngOnDestroy(): void {
    // if (this.recipesSubs) {
    //   this.recipesSubs.unsubscribe();
    // }
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
