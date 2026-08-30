import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Layout } from './layout';

@Component({
  imports: [Layout],
  template: `
    <app-layout>
      <span slot="header" class="probe-header"></span>
      <span class="probe-main"></span>
      <span slot="footer" class="probe-footer"></span>
    </app-layout>
  `,
})
class FilledHost {}

@Component({
  imports: [Layout],
  template: `<app-layout />`,
})
class EmptyHost {}

describe('Layout', () => {
  it('should create the layout', () => {
    const fixture = TestBed.createComponent(Layout);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render header, main and footer', async () => {
    const fixture = TestBed.createComponent(Layout);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.layout > .layout__header')).toBeTruthy();
    expect(compiled.querySelector('.layout > .layout__main')).toBeTruthy();
    expect(compiled.querySelector('.layout > .layout__footer')).toBeTruthy();
  });

  it('should project content into the matching region', async () => {
    const fixture = TestBed.createComponent(FilledHost);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.layout__header .probe-header')).toBeTruthy();
    expect(compiled.querySelector('.layout__main .probe-main')).toBeTruthy();
    expect(compiled.querySelector('.layout__footer .probe-footer')).toBeTruthy();
  });

  it('should leave header and footer empty when nothing is projected', async () => {
    const fixture = TestBed.createComponent(EmptyHost);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    // :empty ist die Bedingung, unter der das CSS die Region ausblendet.
    expect(compiled.querySelector('.layout__header')?.matches(':empty')).toBe(true);
    expect(compiled.querySelector('.layout__footer')?.matches(':empty')).toBe(true);
  });
});
