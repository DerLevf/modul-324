import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from './game';

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  function flushWordLists() {
    httpMock.expectOne('target-words.json').flush({ data: ['apfel'] });
    httpMock.expectOne('other-words.json').flush({ data: ['zylon'] });
  }

  function typeWord(word: string) {
    for (const letter of word) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: letter }));
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('picks a solution word once the word lists are loaded', async () => {
    flushWordLists();
    await fixture.whenStable();
    await Promise.resolve();

    expect(component.solution()).toBe('apfel');
  });

  it('submits a word that exists in the word list', async () => {
    flushWordLists();
    await fixture.whenStable();
    typeWord('apfel');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();

    expect(component.submittedWords()).toEqual([['A', 'P', 'F', 'E', 'L']]);
    expect(component.currentWord()).toEqual([]);
  });

  it('does not submit a word that is not in the word list', async () => {
    flushWordLists();
    await fixture.whenStable();
    typeWord('xxxxx');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();

    expect(component.submittedWords()).toEqual([]);
    expect(component.currentWord()).toEqual(['X', 'X', 'X', 'X', 'X']);
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

  it('submits a word containing umlauts that exists in the word list', async () => {
    httpMock.expectOne('target-words.json').flush({ data: ['äcker'] });
    httpMock.expectOne('other-words.json').flush({ data: [] });
    await fixture.whenStable();
    typeWord('äcker');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();

    expect(component.submittedWords()).toEqual([['Ä', 'C', 'K', 'E', 'R']]);
  });
});
