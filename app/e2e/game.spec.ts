import { test, expect } from '@playwright/test';

test.describe('Wordle Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/game');
  });

  test('displays typed letters', async ({ page }) => {
    await page.keyboard.type('HELLO');

    const letters = page.locator('app-word').first().locator('app-letter');

    await expect(letters.nth(0)).toContainText('H');
    await expect(letters.nth(1)).toContainText('E');
    await expect(letters.nth(2)).toContainText('L');
    await expect(letters.nth(3)).toContainText('L');
    await expect(letters.nth(4)).toContainText('O');
  });

  test('does not allow more than five letters', async ({ page }) => {
    await page.keyboard.type('HELLOWORLD');

    const letters = page.locator('app-word').first().locator('app-letter');

    await expect(letters).toHaveCount(5);
    await expect(letters.nth(4)).toContainText('O');
  });

  test('deletes the last letter with Backspace', async ({ page }) => {
    await page.keyboard.type('HELL');
    await page.keyboard.press('Backspace');

    const letters = page.locator('app-word').first().locator('app-letter');

    await expect(letters.nth(0)).toContainText('H');
    await expect(letters.nth(1)).toContainText('E');
    await expect(letters.nth(2)).toContainText('L');
    await expect(letters.nth(3)).toHaveText('');
    await expect(letters.nth(4)).toHaveText('');
  });

  test('submits a word with Enter', async ({ page }) => {
    await page.keyboard.type('HELLO');
    await page.keyboard.press('Enter');

    const words = page.locator('app-word  ');

    await expect(words).toHaveCount(2);

    const submittedWord = words.nth(0).locator('app-letter');

    await expect(submittedWord.nth(0)).toContainText('H');
    await expect(submittedWord.nth(1)).toContainText('E');
    await expect(submittedWord.nth(2)).toContainText('L');
    await expect(submittedWord.nth(3)).toContainText('L');
    await expect(submittedWord.nth(4)).toContainText('O');
  });

  test('does not submit an incomplete word', async ({ page }) => {
    await page.keyboard.type('HELL');
    await page.keyboard.press('Enter');

    const words = page.locator('app-word');

    await expect(words).toHaveCount(1);
  });

  test('can submit multiple words', async ({ page }) => {
    await page.keyboard.type('HELLO');
    await page.keyboard.press('Enter');

    await page.keyboard.type('WORLD');
    await page.keyboard.press('Enter');

    const words = page.locator('app-word');

    await expect(words).toHaveCount(3);

    const submittedWordHello = words.nth(0).locator('app-letter');

    await expect(submittedWordHello.nth(0)).toContainText('H');
    await expect(submittedWordHello.nth(1)).toContainText('E');
    await expect(submittedWordHello.nth(2)).toContainText('L');
    await expect(submittedWordHello.nth(3)).toContainText('L');
    await expect(submittedWordHello.nth(4)).toContainText('O');

    const submittedWordWorld = words.nth(1).locator('app-letter');

    await expect(submittedWordWorld.nth(0)).toContainText('W');
    await expect(submittedWordWorld.nth(1)).toContainText('O');
    await expect(submittedWordWorld.nth(2)).toContainText('R');
    await expect(submittedWordWorld.nth(3)).toContainText('L');
    await expect(submittedWordWorld.nth(4)).toContainText('D');
  });
});
