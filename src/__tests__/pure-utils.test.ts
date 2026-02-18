import { describe, test, expect } from 'bun:test';
import { isEqual, isBefore, isAfter } from '../pure-utils';

describe('isEqual', () => {
  test('returns true for identical dates', () => {
    const a = { year: 1447, month: 8, day: 20 };
    const b = { year: 1447, month: 8, day: 20 };
    expect(isEqual(a, b)).toBe(true);
  });

  test('returns false when year differs', () => {
    expect(
      isEqual(
        { year: 1447, month: 8, day: 20 },
        { year: 1448, month: 8, day: 20 }
      )
    ).toBe(false);
  });

  test('returns false when month differs', () => {
    expect(
      isEqual(
        { year: 1447, month: 8, day: 20 },
        { year: 1447, month: 9, day: 20 }
      )
    ).toBe(false);
  });

  test('returns false when day differs', () => {
    expect(
      isEqual(
        { year: 1447, month: 8, day: 20 },
        { year: 1447, month: 8, day: 21 }
      )
    ).toBe(false);
  });
});

describe('isBefore', () => {
  test('returns true when year is earlier', () => {
    expect(
      isBefore(
        { year: 1446, month: 12, day: 30 },
        { year: 1447, month: 1, day: 1 }
      )
    ).toBe(true);
  });

  test('returns true when month is earlier', () => {
    expect(
      isBefore(
        { year: 1447, month: 7, day: 30 },
        { year: 1447, month: 8, day: 1 }
      )
    ).toBe(true);
  });

  test('returns true when day is earlier', () => {
    expect(
      isBefore(
        { year: 1447, month: 8, day: 19 },
        { year: 1447, month: 8, day: 20 }
      )
    ).toBe(true);
  });

  test('returns false for same date', () => {
    const d = { year: 1447, month: 8, day: 20 };
    expect(isBefore(d, d)).toBe(false);
  });

  test('returns false when later', () => {
    expect(
      isBefore(
        { year: 1447, month: 8, day: 21 },
        { year: 1447, month: 8, day: 20 }
      )
    ).toBe(false);
  });
});

describe('isAfter', () => {
  test('returns true when date is later', () => {
    expect(
      isAfter(
        { year: 1447, month: 8, day: 21 },
        { year: 1447, month: 8, day: 20 }
      )
    ).toBe(true);
  });

  test('returns false for same date', () => {
    const d = { year: 1447, month: 8, day: 20 };
    expect(isAfter(d, d)).toBe(false);
  });

  test('returns false when earlier', () => {
    expect(
      isAfter(
        { year: 1447, month: 8, day: 19 },
        { year: 1447, month: 8, day: 20 }
      )
    ).toBe(false);
  });
});
