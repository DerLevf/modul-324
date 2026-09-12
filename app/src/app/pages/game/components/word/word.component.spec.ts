import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordComponent } from './word.component';

describe('Word', () => {
  let component: WordComponent;
  let fixture: ComponentFixture<WordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
