# hijri-native

Gregorian ↔ Hijri (Umm al-Qura) conversion using native OS APIs. iOS uses `NSCalendar.islamicUmmAlQura`, Android uses `java.time.chrono.HijrahChronology`. No JS math, no lookup tables.

## Requirements

- React Native 0.76+ (New Architecture / TurboModules)
- iOS 13+
- Android API 24+

## Installation

```sh
npm install hijri-native
# or
yarn add hijri-native
# or
bun add hijri-native
```

## API

```typescript
import { toHijri, toGregorian, fromTimestamp, getDaysInMonth, today } from 'hijri-native';

// Gregorian → Hijri
const hijri = toHijri(2026, 2, 18);
// { year: 1447, month: 8, day: 20 }

// Hijri → Gregorian
const greg = toGregorian(1447, 8, 20);
// { year: 2026, month: 2, day: 18 }

// Unix timestamp (seconds) + timezone → Hijri
const hijriNow = fromTimestamp(Math.floor(Date.now() / 1000), 'Asia/Riyadh');

// Today's Hijri date in a timezone
const todayHijri = today('Asia/Riyadh');

// Days in a Hijri month
const days = getDaysInMonth(8, 1447); // 29 or 30
```

## Utilities

```typescript
import { isEqual, isBefore, isAfter, differenceInDays, addDays } from 'hijri-native';

const a = { year: 1447, month: 8, day: 20 };
const b = { year: 1447, month: 9, day: 1 };

isEqual(a, b);          // false
isBefore(a, b);         // true
isAfter(a, b);          // false
differenceInDays(a, b); // 10
addDays(a, 5);          // { year: 1447, month: 8, day: 25 }
```

## Types

```typescript
import type { HijriDate } from 'hijri-native';
// { year: number; month: number; day: number }
```

## License

MIT
