import { Component, HostListener, signal } from '@angular/core';
import { Layout } from '../../components/layout/layout';
import { WordList } from './components/word-list/word-list';

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

  private submitWord() {

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
