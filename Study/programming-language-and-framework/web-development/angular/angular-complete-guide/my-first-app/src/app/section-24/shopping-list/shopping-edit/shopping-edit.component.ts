import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild('f', { static: true }) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            ingredient: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.slService.getIngredient(index);
    // this.slForm.setValue({
    //   ingredient: this.editedItem.name,
    //   amount: this.editedItem.amount,
    // });
    //   }
    // );
  }

  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.slService.addIngredient(newIngredient);
  // }

  onSubmit(ingredientData: NgForm) {
    const value = ingredientData.form.value;
    const newIngredient = new Ingredient(value.ingredient, +value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          // index: this.editedItemIndex,
          newIngredient
        )
      );
    } else {
      // console.log(ingredientData);
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.slForm.reset();
    this.editedItem = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteIngredient() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
    this.editMode = false;
  }
}
