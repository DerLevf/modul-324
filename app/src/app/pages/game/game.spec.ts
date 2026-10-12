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
        const data = url === 'target-words.json' ? ['apfel', 'birne'] : ['zylon'];
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
});
