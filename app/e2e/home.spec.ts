import { expect, test } from '@playwright/test';

test.describe('Start page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the SPEEDL logo in the header linking to the start page', async ({ page }) => {
    const logo = page.getByRole('banner').getByRole('link', { name: 'SpeedL Startseite' });

    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('SPEEDL');
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('shows headline, subtext and record', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/60\s*Sekunden/);
    await expect(page.getByText('Wie viele Wordles schaffst du?')).toBeVisible();
    await expect(
      page.getByRole('banner').getByText('Noch kein Rekord spiel deine erste Runde'),
    ).toBeVisible();
  });

  test('shows the colour legend', async ({ page }) => {
    await expect(page.getByRole('contentinfo').getByRole('listitem')).toHaveText([
      'richtig',
      'falsche Stelle',
      'nicht im Wort',
    ]);
  });

  test('shows the call to action and the timer hint', async ({ page }) => {
    const cta = page.getByRole('main').getByRole('link', { name: 'Jetzt starten' });

    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/game');
    await expect(page.getByRole('contentinfo').getByText('Uhr läuft ab dem Klick')).toBeVisible();
  });

  test('moves record and call to action into the footer on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 680 });

    const footer = page.getByRole('contentinfo');
    const record = 'Noch kein Rekord spiel deine erste Runde';

    await expect(footer.getByRole('link', { name: 'Jetzt starten' })).toBeVisible();
    await expect(footer.getByText(record)).toBeVisible();
    await expect(footer.getByText('Uhr läuft ab dem Tippen')).toBeVisible();
    await expect(page.getByRole('banner').getByText(record)).toBeHidden();
  });

  for (const viewport of [
    { name: 'mobile', width: 360, height: 680 },
    { name: 'desktop', width: 1440, height: 900 },
  ]) {
    test(`renders without horizontal scrolling on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );

      expect(overflows).toBe(false);
      await expect(page.getByRole('link', { name: 'Jetzt starten' })).toBeInViewport();
    });
  }
});
