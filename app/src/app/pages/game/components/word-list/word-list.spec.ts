import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordList } from './word-list';

describe('WordList', () => {
  let component: WordList;
  let fixture: ComponentFixture<WordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordList],
    }).compileComponents();

    fixture = TestBed.createComponent(WordList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
