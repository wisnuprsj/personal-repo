import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true })
  nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', { static: true })
  amountInput: ElementRef<HTMLInputElement>;
  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;
    this.ingredientAdded.emit(new Ingredient(name, amount));
  }

  onClear() {
    console.log(this.nameInput.nativeElement.value);
    console.log(this.amountInput.nativeElement.value);
  }
}
