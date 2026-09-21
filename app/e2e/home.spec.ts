import { expect, test, type Locator, type Page } from '@playwright/test';

const RECORD_EMPTY = 'Noch kein Rekord vorhanden – spiel deine erste Runde';
const TIMER_HINT = 'Die Uhr startet direkt mit Spielbeginn';
const LEGEND = ['richtig', 'falsche Stelle', 'nicht im Wort'];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 360, height: 680 };

/** Resolves a design token from styles.css into the `rgb()` form `getComputedStyle` reports. */
const tokenColor = (page: Page, token: string) =>
  page.evaluate((name) => {
    const probe = document.createElement('span');
    probe.style.color = `var(${name})`;
    document.body.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();

    return color;
  }, token);

const backgroundColor = (element: Locator) =>
  element.evaluate((node) => getComputedStyle(node).backgroundColor);

const scrollsHorizontally = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

test.describe('Start page', () => {
  test.use({ viewport: DESKTOP });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('logo', () => {
    test('spells SPEEDL as six tiles in the header', async ({ page }) => {
      const tiles = page.getByRole('banner').locator('app-logo .logo__tile');

      await expect(tiles).toHaveText(['S', 'P', 'E', 'E', 'D', 'L']);
    });

    test('colours the first two tiles like a solved guess', async ({ page }) => {
      const tiles = page.locator('app-logo .logo__tile');

      expect(await backgroundColor(tiles.nth(0))).toBe(await tokenColor(page, '--color-correct'));
      expect(await backgroundColor(tiles.nth(1))).toBe(await tokenColor(page, '--color-present'));
      expect(await backgroundColor(tiles.nth(2))).toBe('rgba(0, 0, 0, 0)');
    });

    test('links to the start page and hides the tiles from screen readers', async ({ page }) => {
      const logo = page.getByRole('banner').getByRole('link', { name: 'SpeedL Startseite' });

      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', '/');
      await expect(page.locator('app-logo .logo__tile[aria-hidden="true"]')).toHaveCount(6);
    });
  });

  test('shows the headline and the subtext', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/60\s*Sekunden/);
    await expect(page.getByText('Wie viele Wordles schaffst du?')).toBeVisible();
  });

  test('invites the player to start when there is no record yet', async ({ page }) => {
    await expect(page.getByRole('banner').getByText(RECORD_EMPTY)).toBeVisible();
  });

  test('shows the colour legend', async ({ page }) => {
    await expect(page.getByRole('contentinfo').getByRole('listitem')).toHaveText(LEGEND);
  });

  test('shows the hint about the timer', async ({ page }) => {
    await expect(page.getByRole('contentinfo').getByText(TIMER_HINT)).toBeVisible();
  });

  test('starts the game from the call to action', async ({ page }) => {
    const cta = page.getByRole('main').getByRole('link', { name: 'Jetzt starten' });

    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/game');

    await cta.click();

    await expect(page).toHaveURL(/\/game$/);
  });

  test('renders without horizontal scrolling', async ({ page }) => {
    expect(await scrollsHorizontally(page)).toBe(false);
    await expect(
      page.getByRole('main').getByRole('link', { name: 'Jetzt starten' }),
    ).toBeInViewport();
  });

  test.describe('on mobile', () => {
    test.use({ viewport: MOBILE });

    test('moves the record and the call to action into the footer', async ({ page }) => {
      const footer = page.getByRole('contentinfo');

      await expect(footer.getByRole('link', { name: 'Jetzt starten' })).toBeVisible();
      await expect(footer.getByText(RECORD_EMPTY)).toBeVisible();
      await expect(page.getByRole('banner').getByText(RECORD_EMPTY)).toBeHidden();
      await expect(
        page.getByRole('main').getByRole('link', { name: 'Jetzt starten' }),
      ).toBeHidden();
    });

    test('keeps logo, headline and legend visible', async ({ page }) => {
      await expect(
        page.getByRole('banner').getByRole('link', { name: 'SpeedL Startseite' }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('contentinfo').getByRole('listitem')).toHaveText(LEGEND);
    });

    test('renders without horizontal scrolling', async ({ page }) => {
      expect(await scrollsHorizontally(page)).toBe(false);
      await expect(
        page.getByRole('contentinfo').getByRole('link', { name: 'Jetzt starten' }),
      ).toBeInViewport();
    });
  });
});
