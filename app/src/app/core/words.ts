import { Service } from '@angular/core';

export const WORD_LENGTH = 5;
export const WORD_PATTERN = new RegExp(`^[a-zäöü]{${WORD_LENGTH}}$`, 'i');

interface WordListFile {
  data: string[];
}

interface WordLists {
  targetWords: string[];
  validWords: Set<string>;
}

@Service()
export class Words {
  private wordLists?: Promise<WordLists>;

  async getTargetWords(): Promise<string[]> {
    const { targetWords } = await this.loadWordLists();
    return targetWords;
  }

  async getRandomTargetWord(): Promise<string> {
    const { targetWords } = await this.loadWordLists();
    return targetWords[Math.floor(Math.random() * targetWords.length)];
  }

  async isValidWord(word: string): Promise<boolean> {
    if (!WORD_PATTERN.test(word)) {
      return false;
    }

    const { validWords } = await this.loadWordLists();
    return validWords.has(word.toLowerCase());
  }

  private loadWordLists(): Promise<WordLists> {
    this.wordLists ??= Promise.all([
      fetch('target-words.json').then((response) => response.json() as Promise<WordListFile>),
      fetch('other-words.json').then((response) => response.json() as Promise<WordListFile>),
    ]).then(([target, other]) => {
      const targetWords = target.data.map((word) => word.toLowerCase());
      const otherWords = other.data.map((word) => word.toLowerCase());
      return { targetWords, validWords: new Set([...targetWords, ...otherWords]) };
    });

    return this.wordLists;
  }
}
