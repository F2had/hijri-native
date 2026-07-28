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

/**
 * Resolved with `get` rather than `getEnforcing` so that *importing* this
 * package never throws where the native binary is absent — Jest, SSR, web
 * bundles, or a consumer that only re-exports us. Callers go through
 * `requireNative()` in index.tsx, which raises a clear error at the point a
 * calendar method is actually used.
 *
 * The call stays at the top level: React Native's codegen reads the module
 * name from this expression, so it must not move inside a function.
 */
export default TurboModuleRegistry.get<Spec>('HijriNative');
