import { Component, inject, signal } from '@angular/core';
import { Layout } from '../../components/layout/layout';
import { Words } from '../../core/words';
import { WordList } from './components/word-list/word-list';

const LETTER_KEY_PATTERN = /^[a-zA-ZäöüÄÖÜ]$/;

@Component({
  imports: [Layout, WordList],
  selector: 'app-game',
  styleUrl: './game.css',
  templateUrl: './game.html',
  host: {
    '(window:keydown)': 'handleKeydown($event)',
  },
})
export class Game {
  private readonly words = inject(Words);

  readonly wordLength = 5;
  currentWord = signal<string[]>([]);
  submittedWords = signal<string[][]>([]);
  readonly solution = signal<string>('');

  constructor() {
    this.words.getRandomSolution().then(word => this.solution.set(word));
  }

  handleKeydown(event: KeyboardEvent) {

    if (event.key === 'Backspace') {
      event.preventDefault();
      this.removeLetter();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitWord();
      return;
    }

    if (LETTER_KEY_PATTERN.test(event.key)) {
      this.addLetter(event.key.toUpperCase());
    }
  }

  private addLetter(letter: string) {

    if (this.currentWord().length >= this.wordLength) {
      return;
    }

    this.currentWord.update(word => [...word, letter]);
  }

  private removeLetter() {

    if (this.currentWord().length === 0) {
      return;
    }

    this.currentWord.update(word => word.slice(0, -1));
  }

  private async submitWord() {

    if (this.currentWord().length !== this.wordLength) {
      return;
    }

    const word = this.currentWord().join('');

    if (!(await this.words.isValidWord(word))) {
      return;
    }

    this.submittedWords.update(words => [
      ...words,
      [...this.currentWord()]
    ]);

    this.currentWord.set([]);
  }
}
