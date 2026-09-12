import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetterComponent } from './letter.component';

describe('Letter', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
