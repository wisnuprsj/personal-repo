import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lorem, random } from 'faker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'section-04';
  generatedText: string = '';
  userInput: string = '';
  showMessage: boolean = false;

  ngOnInit(): void {
    this.generatedText = lorem.sentence();
  }

  onUserType() {
    if (this.userInput === this.generatedText) {
      this.generatedText = lorem.sentence();
      this.userInput = '';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 1000);
    }
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    }
    return randomLetter === enteredLetter ? 'correct' : 'incorrect';
  }
}
