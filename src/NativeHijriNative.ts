import { TurboModuleRegistry, type TurboModule } from 'react-native';

/** Date components shared between Hijri and Gregorian representations. */
type DateResult = {
  year: number;
  month: number;
  day: number;
};

/**
 * TurboModule spec for native Hijri (Umm al-Qura) calendar operations.
 * All methods are synchronous — calendar math is pure computation.
 */
export interface Spec extends TurboModule {
  /** Convert a Gregorian date to Hijri (Umm al-Qura). */
  toHijri(year: number, month: number, day: number): DateResult;

  /** Convert a Hijri (Umm al-Qura) date to Gregorian. */
  toGregorian(year: number, month: number, day: number): DateResult;

  /** Convert a Unix timestamp (seconds) in the given IANA timezone to Hijri. */
  fromTimestamp(timestamp: number, timezone: string): DateResult;

  /** Number of days in the given Hijri month/year. */
  getDaysInMonth(month: number, year: number): number;

  /** Today's Hijri date in the given IANA timezone. */
  today(timezone: string): DateResult;
}

export default TurboModuleRegistry.getEnforcing<Spec>('HijriNative');
