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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('picks a solution word once the word lists are loaded', async () => {
    flushWordLists();
    await fixture.whenStable();
    await Promise.resolve();

    expect(component.solution()).toBe('apfel');
  });
});
