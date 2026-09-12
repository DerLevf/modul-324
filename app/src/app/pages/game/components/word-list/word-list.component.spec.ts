import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordListComponent } from './word-list.component';

describe('WordList', () => {
  let component: WordListComponent;
  let fixture: ComponentFixture<WordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
