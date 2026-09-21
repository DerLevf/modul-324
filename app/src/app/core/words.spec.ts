import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WORD_PATTERN, Words } from './words';

describe('Words', () => {
  let service: Words;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Words);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function flushWordLists(target: string[], other: string[]) {
    httpMock.expectOne('target-words.json').flush({ data: target });
    httpMock.expectOne('other-words.json').flush({ data: other });
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('picks a random solution from the target word list', async () => {
    const solutionPromise = service.getRandomSolution();
    flushWordLists(['apfel', 'birne'], ['zylon']);

    const solution = await solutionPromise;

    expect(['apfel', 'birne']).toContain(solution);
  });

  it('accepts a word that is in the target list', async () => {
    const validPromise = service.isValidWord('apfel');
    flushWordLists(['apfel', 'birne'], ['zylon']);

    expect(await validPromise).toBe(true);
  });

  it('accepts a word that is only in the other-words list', async () => {
    const validPromise = service.isValidWord('zylon');
    flushWordLists(['apfel', 'birne'], ['zylon']);

    expect(await validPromise).toBe(true);
  });

  it('is case-insensitive when checking validity', async () => {
    const validPromise = service.isValidWord('APFEL');
    flushWordLists(['apfel', 'birne'], ['zylon']);

    expect(await validPromise).toBe(true);
  });

  it('rejects a word that is in neither list', async () => {
    const validPromise = service.isValidWord('xxxxx');
    flushWordLists(['apfel', 'birne'], ['zylon']);

    expect(await validPromise).toBe(false);
  });

  it('rejects a malformed word without making a request', async () => {
    const validPromise = service.isValidWord('ab1de');

    expect(await validPromise).toBe(false);
    httpMock.expectNone('target-words.json');
    httpMock.expectNone('other-words.json');
  });

  it('only fetches the word lists once for multiple calls', async () => {
    const firstPromise = service.isValidWord('apfel');
    flushWordLists(['apfel', 'birne'], ['zylon']);
    await firstPromise;

    await service.isValidWord('birne');
    await service.getRandomSolution();
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
