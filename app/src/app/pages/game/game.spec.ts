import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from './game';

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game],
    }).compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function typeWord(word: string) {
    for (const letter of word) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: letter }));
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
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
