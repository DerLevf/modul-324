import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { firstValueFrom, forkJoin, map, shareReplay } from 'rxjs';

export const WORD_LENGTH = 5;
export const WORD_PATTERN = new RegExp(`^[a-zäöü]{${WORD_LENGTH}}$`, 'i');

interface WordListFile {
  data: string[];
}

interface WordLists {
  solutions: string[];
  valid: Set<string>;
}

@Service()
export class Words {
  private readonly http = inject(HttpClient);

  private readonly wordLists$ = forkJoin({
    target: this.http.get<WordListFile>('target-words.json'),
    other: this.http.get<WordListFile>('other-words.json'),
  }).pipe(
    map(({ target, other }): WordLists => {
      const solutions = target.data.map(word => word.toLowerCase());
      const valid = new Set([...solutions, ...other.data.map(word => word.toLowerCase())]);
      return { solutions, valid };
    }),
    shareReplay(1),
  );

  async getRandomSolution(): Promise<string> {
    const { solutions } = await firstValueFrom(this.wordLists$);
    return solutions[Math.floor(Math.random() * solutions.length)];
  }

  async isValidWord(word: string): Promise<boolean> {
    if (!WORD_PATTERN.test(word)) {
      return false;
    }

    const { valid } = await firstValueFrom(this.wordLists$);
    return valid.has(word.toLowerCase());
  }
}
