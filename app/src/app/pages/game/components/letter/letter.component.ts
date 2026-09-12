import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-letter',
  styleUrl: './letter.component.css',
  templateUrl: './letter.component.html',
})
export class LetterComponent {
    letter = input<string>('');
}
