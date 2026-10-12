import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Game } from './game';

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;

  beforeEach(async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        const data = url === 'target-words.json' ? ['apfel', 'birne'] : ['zylon', 'äcker'];
        return Promise.resolve({ json: () => Promise.resolve({ data }) } as Response);
      }),
    );

    await TestBed.configureTestingModule({
      imports: [Game],
    }).compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function typeWord(word: string) {
    for (const letter of word) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: letter }));
    }
  }

  function pressEnter() {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  }

  function settle() {
    return new Promise((resolve) => setTimeout(resolve));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects a solution from the target words when the game starts', async () => {
    await vi.waitFor(() => expect(component.solution()).not.toBe(''));

    expect(['apfel', 'birne']).toContain(component.solution());
  });

  it('can select a new solution', async () => {
    const random = vi.spyOn(Math, 'random');

    random.mockReturnValue(0);
    await component.selectSolution();
    expect(component.solution()).toBe('apfel');

    random.mockReturnValue(0.99);
    await component.selectSolution();
    expect(component.solution()).toBe('birne');
  });

  it('accepts umlaut letters when typing', () => {
    typeWord('äöü');

    expect(component.currentWord()).toEqual(['Ä', 'Ö', 'Ü']);
  });

  it('ignores keys that are not letters', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(component.currentWord()).toEqual([]);
  });

  it('does not submit a word with the wrong length', async () => {
    typeWord('zylo');

    pressEnter();
    await settle();

    expect(component.submittedWords()).toEqual([]);
    expect(component.currentWord()).toEqual(['Z', 'Y', 'L', 'O']);
  });

  it('submits a word that is in the target words', async () => {
    typeWord('apfel');

    pressEnter();
    await settle();

    expect(component.submittedWords()).toEqual([['A', 'P', 'F', 'E', 'L']]);
    expect(component.currentWord()).toEqual([]);
  });

  it('submits a word that is only in the other words', async () => {
    typeWord('zylon');

    pressEnter();
    await settle();

    expect(component.submittedWords()).toEqual([['Z', 'Y', 'L', 'O', 'N']]);
  });

  it('submits a valid word containing umlauts', async () => {
    typeWord('äcker');

    pressEnter();
    await settle();

    expect(component.submittedWords()).toEqual([['Ä', 'C', 'K', 'E', 'R']]);
  });

  it('keeps the current word when it is not in the word list', async () => {
    typeWord('xxxxx');

    pressEnter();
    await settle();

    expect(component.submittedWords()).toEqual([]);
    expect(component.currentWord()).toEqual(['X', 'X', 'X', 'X', 'X']);
  });

  it('accepts input again after an invalid word', async () => {
    typeWord('xxxxx');
    pressEnter();
    await settle();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));

    expect(component.currentWord()).toEqual(['X', 'X', 'X', 'X']);
  });

  it('ignores keystrokes while the word is being validated', async () => {
    typeWord('apfel');

    pressEnter();
    typeWord('abc');
    await settle();

    expect(component.submittedWords()).toHaveLength(1);
    expect(component.currentWord()).toEqual([]);
  });

  it('submits a word only once when Enter is pressed twice', async () => {
    typeWord('apfel');

    pressEnter();
    pressEnter();
    await settle();

    expect(component.submittedWords()).toHaveLength(1);
  });
});
