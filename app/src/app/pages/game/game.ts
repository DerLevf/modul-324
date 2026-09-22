import { Component, signal } from '@angular/core';
import { Layout } from '../../components/layout/layout';
import { WordList } from './components/word-list/word-list';
import { Keyboard } from './components/keyboard/keyboard';

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
  readonly wordLength = 5;
  currentWord = signal<string[]>([]);
  submittedWords = signal<string[][]>([]);

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

    if (/^[a-zA-Z]$/.test(event.key)) {
      this.addLetter(event.key.toUpperCase());
    }
  }

  addLetter(letter: string) {

    if (this.currentWord().length >= this.wordLength) {
      return;
    }

    this.currentWord.update(word => [...word, letter]);
  }

  removeLetter() {

    if (this.currentWord().length === 0) {
      return;
    }

    this.currentWord.update(word => word.slice(0, -1));
  }

  submitWord() {

    if (this.currentWord().length !== this.wordLength) {
      return;
    }

    this.submittedWords.update(words => [
      ...words,
      [...this.currentWord()]
    ]);

    this.currentWord.set([]);
  }
}
