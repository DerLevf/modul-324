import { Component, input } from '@angular/core';
import { WordComponent } from '../word/word.component';

@Component({
  selector: 'app-word-list',
  imports: [WordComponent],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css',
})
export class WordListComponent {
  words = input<string[][]>([]);

  currentWord = input<string[]>([]);
}
