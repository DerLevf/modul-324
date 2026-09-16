import { Component, input } from '@angular/core';
import { Word } from '../word/word';

@Component({
  selector: 'app-word-list',
  imports: [Word],
  templateUrl: './word-list.html',
  styleUrl: './word-list.css',
})
export class WordList {
  words = input<string[][]>([]);
  currentWord = input<string[]>([]);
}
