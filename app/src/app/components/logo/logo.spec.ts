import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Logo } from './logo';

describe('Logo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo],
      providers: [provideRouter([{ path: '**', component: Logo }])],
    }).compileComponents();
  });

  it('should create the logo', () => {
    const fixture = TestBed.createComponent(Logo);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render SPEEDL as six tiles', async () => {
    const fixture = TestBed.createComponent(Logo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const tiles = compiled.querySelectorAll('.logo__tile');

    expect(tiles.length).toBe(6);
    expect(Array.from(tiles, (tile) => tile.textContent?.trim()).join('')).toBe('SPEEDL');
  });

  it('should colour code the first two tiles', async () => {
    const fixture = TestBed.createComponent(Logo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const tiles = compiled.querySelectorAll('.logo__tile');

    expect(tiles[0].classList).toContain('logo__tile--correct');
    expect(tiles[1].classList).toContain('logo__tile--present');
    expect(tiles[2].classList).toContain('logo__tile--empty');
  });

  it('should expose the wordmark to assistive technology', async () => {
    const fixture = TestBed.createComponent(Logo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const logo = compiled.querySelector('.logo');

    expect(logo?.getAttribute('aria-label')).toBe('SpeedL Startseite');
    expect(logo?.querySelectorAll('.logo__tile[aria-hidden="true"]').length).toBe(6);
  });

  it('should link to the home page', async () => {
    const fixture = TestBed.createComponent(Logo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const logo = compiled.querySelector('.logo');

    expect(logo?.tagName).toBe('A');
    expect(logo?.getAttribute('href')).toBe('/');
  });

  it('should navigate to the home page when clicked', async () => {
    const harness = await RouterTestingHarness.create('/game');
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/game');

    harness.routeNativeElement?.querySelector<HTMLElement>('.logo')?.click();
    await harness.fixture.whenStable();

    expect(router.url).toBe('/');
  });
});
