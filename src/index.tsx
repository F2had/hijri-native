import HijriNativeModule from './NativeHijriNative';
import { isEqual, isBefore, isAfter } from './pure-utils';

export type HijriDate = {
  year: number;
  month: number;
  day: number;
};

export { isEqual, isBefore, isAfter };

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateGregorianDate(year: number, month: number, day: number) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    throw new Error(
      `[hijri-native] Date components must be integers, got (${year}, ${month}, ${day})`
    );
  }
  if (month < 1 || month > 12) {
    throw new Error(
      `[hijri-native] Gregorian month must be 1–12, got ${month}`
    );
  }
  if (day < 1 || day > 31) {
    throw new Error(`[hijri-native] Gregorian day must be 1–31, got ${day}`);
  }
}

function validateHijriDate(year: number, month: number, day: number) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    throw new Error(
      `[hijri-native] Date components must be integers, got (${year}, ${month}, ${day})`
    );
  }
  if (year < 1) {
    throw new Error(`[hijri-native] Hijri year must be positive, got ${year}`);
  }
  if (month < 1 || month > 12) {
    throw new Error(`[hijri-native] Hijri month must be 1–12, got ${month}`);
  }
  if (day < 1 || day > 30) {
    throw new Error(`[hijri-native] Hijri day must be 1–30, got ${day}`);
  }
}

function validateTimezone(timezone: string) {
  if (!timezone || typeof timezone !== 'string') {
    throw new Error(
      `[hijri-native] Timezone must be a non-empty IANA string, got "${timezone}"`
    );
  }
}

// ---------------------------------------------------------------------------
// Native bridge methods
// ---------------------------------------------------------------------------

export function toHijri(year: number, month: number, day: number): HijriDate {
  validateGregorianDate(year, month, day);
  return HijriNativeModule.toHijri(year, month, day);
}

export function toGregorian(
  year: number,
  month: number,
  day: number
): HijriDate {
  validateHijriDate(year, month, day);
  return HijriNativeModule.toGregorian(year, month, day);
}

export function fromTimestamp(timestamp: number, timezone: string): HijriDate {
  if (typeof timestamp !== 'number' || !Number.isFinite(timestamp)) {
    throw new Error(
      `[hijri-native] Timestamp must be a finite number, got ${timestamp}`
    );
  }
  validateTimezone(timezone);
  return HijriNativeModule.fromTimestamp(timestamp, timezone);
}

export function getDaysInMonth(month: number, year: number): number {
  validateHijriDate(year, month, 1);
  return HijriNativeModule.getDaysInMonth(month, year);
}

export function today(timezone: string): HijriDate {
  validateTimezone(timezone);
  return HijriNativeModule.today(timezone);
}

// ---------------------------------------------------------------------------
// Convenience utilities (pure TypeScript)
// ---------------------------------------------------------------------------

export function differenceInDays(a: HijriDate, b: HijriDate): number {
  const gregA = toGregorian(a.year, a.month, a.day);
  const gregB = toGregorian(b.year, b.month, b.day);

  const dateA = new Date(gregA.year, gregA.month - 1, gregA.day);
  const dateB = new Date(gregB.year, gregB.month - 1, gregB.day);

  return Math.round(
    (dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function addDays(date: HijriDate, days: number): HijriDate {
  if (!Number.isInteger(days)) {
    throw new Error(`[hijri-native] days must be an integer, got ${days}`);
  }
  const greg = toGregorian(date.year, date.month, date.day);
  const jsDate = new Date(greg.year, greg.month - 1, greg.day);
  jsDate.setDate(jsDate.getDate() + days);

  return toHijri(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
