import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClass]',
  standalone: true,
})
export class ClassDirective {
  constructor(private element: ElementRef) {}

  @Input() set appClass(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

  @Input('backgroundColor') set backgroundColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

  @Input('appClass') set classNames(classObj: any) {
    for (let key in classObj) {
      if (classObj[key]) {
        this.element.nativeElement.classList.add(key);
      } else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}

// // Communicate from parent to child component...

// // Parent component template
// <app-card [title]="'SnowyMountains'"></app-card>

// // Child component class
// import {Input} from 'angular'

// class ChildComponent {
//   @Input() title: string;
// }
