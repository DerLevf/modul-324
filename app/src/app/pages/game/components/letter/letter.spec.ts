import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Letter } from './letter';

describe('Letter', () => {
  let component: Letter;
  let fixture: ComponentFixture<Letter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Letter],
    }).compileComponents();

    fixture = TestBed.createComponent(Letter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
