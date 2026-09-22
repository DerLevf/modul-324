import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Keyboard } from './keyboard';

describe('Keyboard', () => {
  let fixture: ComponentFixture<Keyboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Keyboard] }).compileComponents();
    fixture = TestBed.createComponent(Keyboard);
    await fixture.whenStable();
  });

  it('displays all 26 letters and two action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(28);
  });

  it('emits the clicked letter', () => {
    const emitted: string[] = [];
    fixture.componentInstance.letterPressed.subscribe(letter => emitted.push(letter));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label="Buchstabe A"]');
    button.click();
    expect(emitted).toEqual(['A']);
  });

  it('emits delete and enter', () => {
    let deletes = 0;
    let enters = 0;
    fixture.componentInstance.deletePressed.subscribe(() => deletes++);
    fixture.componentInstance.enterPressed.subscribe(() => enters++);
    const root: HTMLElement = fixture.nativeElement;
    root.querySelector<HTMLButtonElement>('[aria-label="Letzten Buchstaben löschen"]')!.click();
    root.querySelector<HTMLButtonElement>('[aria-label="Wort bestätigen"]')!.click();
    expect(deletes).toBe(1);
    expect(enters).toBe(1);
  });
});
