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
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          ingredient: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
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
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // console.log(ingredientData);
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
    this.editedItem = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }
}
