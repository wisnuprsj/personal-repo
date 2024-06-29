import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrl: './equation.component.css',
})
export class EquationComponent implements OnInit {
  constructor() {}

  secondsPerSolution: number = 0;

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(100),
        scan(
          (accValue, _) => {
            return {
              numberSolved: accValue.numberSolved + 1,
              startTime: accValue.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        this.resetForm();
      });
  }

  mathForm: FormGroup = new FormGroup(
    {
      a: new FormControl(this.generateRandomNumber()),
      b: new FormControl(this.generateRandomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  resetForm() {
    this.mathForm.patchValue({
      a: this.generateRandomNumber(),
      b: this.generateRandomNumber(),
      answer: '',
    });
    // this.mathForm.controls['a'].setValue(this.generateRandomNumber());
    // this.mathForm.controls['b'].setValue(this.generateRandomNumber());
    // this.mathForm.controls['answer'].setValue('');
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  get answer() {
    return this.mathForm.value.answer;
  }
}
