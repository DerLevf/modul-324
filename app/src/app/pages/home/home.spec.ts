import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

const stubViewport = (viewport: 'mobile' | 'desktop') => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: viewport === 'desktop',
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }));
};

describe('Home', () => {
  beforeEach(async () => {
    stubViewport('desktop');

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const render = async (setup?: (component: Home) => void) => {
    const fixture = TestBed.createComponent(Home);
    setup?.(fixture.componentInstance);
    await fixture.whenStable();

    return fixture.nativeElement as HTMLElement;
  };

  it('should create the home page', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should use the layout', async () => {
    const compiled = await render();

    expect(compiled.querySelector('app-layout.home .layout')).toBeTruthy();
  });

  it('should show the logo in the header', async () => {
    const compiled = await render();

    expect(compiled.querySelector('.layout__header app-logo')).toBeTruthy();
  });

  it('should show the headline and the subtext', async () => {
    const compiled = await render();

    expect(compiled.querySelector('.home__headline')?.textContent).toContain('60');
    expect(compiled.querySelector('.home__headline')?.textContent).toContain('Sekunden');
    expect(compiled.querySelector('.home__subtext')?.textContent?.trim()).toBe(
      'Wie viele Wordles schaffst du?',
    );
  });

  it('should show the current record', async () => {
    const compiled = await render((component) => component.record.set(11));

    const record = compiled.querySelector('.home__record');

    expect(record?.textContent?.trim()).toBe('Rekord 11 Wörter');
    expect(record?.classList).not.toContain('home__record--empty');
  });

  it('should invite the player to start when there is no record yet', async () => {
    const compiled = await render((component) => component.record.set(null));

    const record = compiled.querySelector('.home__record');

    expect(record?.textContent?.trim()).toBe('Noch kein Rekord spiel deine erste Runde');
    expect(record?.classList).toContain('home__record--empty');
  });

  it('should show the colour legend', async () => {
    const compiled = await render();

    const items = compiled.querySelectorAll('.home__legend-item');

    expect(Array.from(items, (item) => item.textContent?.trim())).toEqual([
      'richtig',
      'falsche Stelle',
      'nicht im Wort',
    ]);
    expect(compiled.querySelector('.home__legend-color--correct')).toBeTruthy();
    expect(compiled.querySelector('.home__legend-color--present')).toBeTruthy();
  });

  it('should show the call to action linking to the game', async () => {
    const compiled = await render();

    const cta = compiled.querySelector('.home__cta');

    expect(cta?.textContent?.trim()).toBe('Jetzt starten');
    expect(cta?.tagName).toBe('A');
    expect(cta?.getAttribute('href')).toBe('/game');
  });

  it('should show the record in the header and the call to action below the intro', async () => {
    const compiled = await render();

    expect(compiled.querySelector('.layout__header .home__record')).toBeTruthy();
    expect(compiled.querySelector('.home__intro .home__cta')).toBeTruthy();
    expect(compiled.querySelector('.layout__footer .home__record')).toBeNull();
    expect(compiled.querySelector('.layout__footer .home__cta')).toBeNull();
  });

  it('should show the hint about the timer', async () => {
    const compiled = await render();

    expect(compiled.querySelector('.layout__footer .home__hint')?.textContent?.trim()).toBe(
      'Uhr läuft ab dem Klick',
    );
  });

  describe('on mobile', () => {
    beforeEach(() => {
      stubViewport('mobile');
    });

    it('should move the record and the call to action to the footer', async () => {
      const compiled = await render();

      expect(compiled.querySelector('.layout__footer .home__record')).toBeTruthy();
      expect(compiled.querySelector('.layout__footer .home__cta')).toBeTruthy();
      expect(compiled.querySelector('.layout__header .home__record')).toBeNull();
      expect(compiled.querySelector('.home__intro .home__cta')).toBeNull();
    });

    it('should show the hint about the timer for touch', async () => {
      const compiled = await render();

      expect(compiled.querySelector('.layout__footer .home__hint')?.textContent?.trim()).toBe(
        'Uhr läuft ab dem Tippen',
      );
    });
  });
});
