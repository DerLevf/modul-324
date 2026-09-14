import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Word } from './word';

describe('Word', () => {
  let component: Word;
  let fixture: ComponentFixture<Word>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Word],
    }).compileComponents();

    fixture = TestBed.createComponent(Word);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
