import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  length = 0;
  password = '';
  useLetter: boolean = false;
  useNumber: boolean = false;
  useSymbol: boolean = false;
  isDisabledButton: boolean = false;

  onGeneratePassword() {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()';

    let validChars = '';
    if (this.useLetter) {
      validChars += letters;
    }

    if (this.useNumber) {
      validChars += numbers;
    }

    if (this.useSymbol) {
      validChars += symbols;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.password = generatedPassword;
  }

  getPassword() {
    return this.password;
  }

  onChangeLetterOption() {
    this.useLetter = !this.useLetter;
  }

  onChangeNumberOption() {
    this.useNumber = !this.useNumber;
  }

  onChangeSymbolOption() {
    this.useSymbol = !this.useSymbol;
  }

  onChangeLength(event: Event) {
    const parsedValue = parseInt((event.target as HTMLInputElement).value);
    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    }
  }
}
