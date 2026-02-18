export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

export function isEqual(a: HijriDate, b: HijriDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function isBefore(a: HijriDate, b: HijriDate): boolean {
  if (a.year !== b.year) return a.year < b.year;
  if (a.month !== b.month) return a.month < b.month;
  return a.day < b.day;
}

export function isAfter(a: HijriDate, b: HijriDate): boolean {
  return isBefore(b, a);
}
