import { Component, input } from '@angular/core';
import { LetterComponent } from '../letter/letter.component';

@Component({
  selector: 'app-word',
  imports: [LetterComponent],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css',
})
export class WordComponent {
  letters = input<string[]>([]);
}
