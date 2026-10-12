import { Component, inject, signal } from '@angular/core';
import { Layout } from '../../components/layout/layout';
import { Words } from '../../core/words';
import { WordList } from './components/word-list/word-list';
import { Keyboard } from './components/keyboard/keyboard';

const LETTER_KEY_PATTERN = /^[a-zA-ZäöüÄÖÜ]$/;

@Component({
  imports: [Layout, WordList, Keyboard],
  selector: 'app-game',
  styleUrl: './game.css',
  templateUrl: './game.html',
  host: {
    '(window:keydown)': 'handleKeydown($event)',
  },
})
export class Game {
  private readonly words = inject(Words);

  private validating = false;

  readonly wordLength = 5;
  currentWord = signal<string[]>([]);
  submittedWords = signal<string[][]>([]);
  readonly solution = signal<string>('');

  constructor() {
    this.selectSolution();
  }

  async selectSolution() {
    this.solution.set(await this.words.getRandomTargetWord());
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

  addLetter(letter: string) {
    if (this.currentWord().length >= this.wordLength) {
      return;
    }

    this.currentWord.update((word) => [...word, letter]);
  }

  removeLetter() {
    if (this.currentWord().length === 0) {
      return;
    }

    this.currentWord.update((word) => word.slice(0, -1));
  }

  submitWord() {
    if (this.validating || this.currentWord().length !== this.wordLength) {
      return;
    }

    this.validating = true;
    const word = this.currentWord().join('');

    void this.words
      .isValidWord(word)
      .then((isValid) => {
        if (!isValid) {
          return;
        }

        this.submittedWords.update((words) => [...words, [...word]]);
        this.currentWord.set([]);
      })
      .finally(() => (this.validating = false));
  }
}
