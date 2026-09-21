import { Component, output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.css',
})
export class Keyboard {
  readonly rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  readonly letterPressed = output<string>();
  readonly deletePressed = output<void>();
  readonly enterPressed = output<void>();
}
