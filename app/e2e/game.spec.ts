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
    await page.keyboard.type('ABEND');
    await page.keyboard.press('Enter');

    const words = page.locator('app-word  ');

    await expect(words).toHaveCount(2);

    const submittedWord = words.nth(0).locator('app-letter');

    await expect(submittedWord.nth(0)).toContainText('A');
    await expect(submittedWord.nth(1)).toContainText('B');
    await expect(submittedWord.nth(2)).toContainText('E');
    await expect(submittedWord.nth(3)).toContainText('N');
    await expect(submittedWord.nth(4)).toContainText('D');
  });

  test('does not submit an incomplete word', async ({ page }) => {
    await page.keyboard.type('HELL');
    await page.keyboard.press('Enter');

    const words = page.locator('app-word');

    await expect(words).toHaveCount(1);
  });

  test('can submit multiple words', async ({ page }) => {
    const words = page.locator('app-word');

    await page.keyboard.type('ABEND');
    await page.keyboard.press('Enter');

    await expect(words).toHaveCount(2);

    await page.keyboard.type('ABGAS');
    await page.keyboard.press('Enter');

    await expect(words).toHaveCount(3);

    const submittedWordAbend = words.nth(0).locator('app-letter');

    await expect(submittedWordAbend.nth(0)).toContainText('A');
    await expect(submittedWordAbend.nth(1)).toContainText('B');
    await expect(submittedWordAbend.nth(2)).toContainText('E');
    await expect(submittedWordAbend.nth(3)).toContainText('N');
    await expect(submittedWordAbend.nth(4)).toContainText('D');

    const submittedWordAbgas = words.nth(1).locator('app-letter');

    await expect(submittedWordAbgas.nth(0)).toContainText('A');
    await expect(submittedWordAbgas.nth(1)).toContainText('B');
    await expect(submittedWordAbgas.nth(2)).toContainText('G');
    await expect(submittedWordAbgas.nth(3)).toContainText('A');
    await expect(submittedWordAbgas.nth(4)).toContainText('S');
  });

  test('applies a fade mask to submitted words', async ({ page }) => {
    await page.keyboard.type('ABEND');
    await page.keyboard.press('Enter');

    const submittedWords = page.locator('.word-list--submitted-words');

    const maskImage = await submittedWords.evaluate((element) => {
      return getComputedStyle(element).maskImage;
    });

    expect(maskImage).toContain('linear-gradient');
  });
});
