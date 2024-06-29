import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EquationComponent } from './equation/equation.component';
import { AnswerHighlightDirective } from './answer-highlight.directive';

@NgModule({
  declarations: [AppComponent, EquationComponent, AnswerHighlightDirective],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
