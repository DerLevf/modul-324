import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WORD_PATTERN, Words } from './words';

function mockWordLists(target: string[], other: string[]) {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      const data = url === 'target-words.json' ? target : other;
      return Promise.resolve({
        json: () => Promise.resolve({ data }),
      } as Response);
    }),
  );
}

describe('Words', () => {
  let service: Words;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Words);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('provides the target words but not the other words', async () => {
    mockWordLists(['apfel', 'Birne'], ['zylon']);

    expect(await service.getTargetWords()).toEqual(['apfel', 'birne']);
  });

  it('accepts a word that is in the target list', async () => {
    mockWordLists(['apfel', 'birne'], ['zylon']);

    expect(await service.isValidWord('apfel')).toBe(true);
  });

  it('accepts a word that is only in the other-words list', async () => {
    mockWordLists(['apfel', 'birne'], ['zylon']);

    expect(await service.isValidWord('zylon')).toBe(true);
  });

  it('is case-insensitive when checking validity', async () => {
    mockWordLists(['apfel', 'birne'], ['zylon']);

    expect(await service.isValidWord('APFEL')).toBe(true);
  });

  it('rejects a word that is in neither list', async () => {
    mockWordLists(['apfel', 'birne'], ['zylon']);

    expect(await service.isValidWord('xxxxx')).toBe(false);
  });

  it('rejects a malformed word without fetching the word lists', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    expect(await service.isValidWord('ab1de')).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('only fetches the word lists once for multiple calls', async () => {
    const fetchSpy = vi.fn((url: string) => {
      const data = url === 'target-words.json' ? ['apfel', 'birne'] : ['zylon'];
      return Promise.resolve({ json: () => Promise.resolve({ data }) } as Response);
    });
    vi.stubGlobal('fetch', fetchSpy);

    await service.isValidWord('apfel');
    await service.isValidWord('birne');
    await service.getTargetWords();

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});

describe('WORD_PATTERN', () => {
  it('matches lowercase words of the expected length, including umlauts', () => {
    expect(WORD_PATTERN.test('apfel')).toBe(true);
    expect(WORD_PATTERN.test('äcker')).toBe(true);
  });

  it('matches uppercase input the same way', () => {
    expect(WORD_PATTERN.test('APFEL')).toBe(true);
  });

  it('rejects words with the wrong length', () => {
    expect(WORD_PATTERN.test('ab')).toBe(false);
    expect(WORD_PATTERN.test('abcdef')).toBe(false);
  });

  it('rejects non-letter characters and ß', () => {
    expect(WORD_PATTERN.test('abc1e')).toBe(false);
    expect(WORD_PATTERN.test('stra ')).toBe(false);
    expect(WORD_PATTERN.test('große')).toBe(false);
  });
});
