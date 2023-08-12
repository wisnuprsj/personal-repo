import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  encapsulation: ViewEncapsulation.Emulated, // None, ShadowDom
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('element') element: { type: string; name: string; content: string };
  @ContentChild('contentParagraph') paragraph: ElementRef;
  constructor() {
    console.log('constructor called!');
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
  }
  ngOnInit() {
    console.log('ngOnInit called!');
  }
  ngDoCheck() {
    console.log('ngDoCheck called!');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
