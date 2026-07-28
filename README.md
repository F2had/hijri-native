# hijri-native

[![CI](https://github.com/F2had/hijri-native/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/F2had/hijri-native/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/hijri-native.svg)](https://www.npmjs.com/package/hijri-native)
[![npm downloads](https://img.shields.io/npm/dm/hijri-native.svg)](https://www.npmjs.com/package/hijri-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Gregorian ↔ Hijri (Umm al-Qura) calendar conversion for React Native using **native OS APIs**.

- 🍎 **iOS**: `NSCalendar.islamicUmmAlQura`
- 🤖 **Android**: `java.time.chrono.HijrahChronology`

✅ No JavaScript math  
✅ No lookup tables  
✅ Zero dependencies  
✅ TypeScript support

---

## Requirements

- React Native 0.76+ (New Architecture / TurboModules)
- iOS 13+
- Android API 24+

---

## Installation

**npm:**

```sh
npm install hijri-native
```

**yarn:**

```sh
yarn add hijri-native
```

**bun:**

```sh
bun add hijri-native
```

---

## Core API

### Conversion Functions

```typescript
import {
  toHijri, // Gregorian → Hijri
  toGregorian, // Hijri → Gregorian
  fromTimestamp, // Unix timestamp → Hijri
  getDaysInMonth, // Get days in Hijri month
  today, // Today's Hijri date
} from 'hijri-native';

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

// Days in a Hijri month (29 or 30)
const days = getDaysInMonth(8, 1447);
```

---

## Utility Functions

```typescript
import {
  isEqual,
  isBefore,
  isAfter,
  differenceInDays,
  addDays,
} from 'hijri-native';

const a = { year: 1447, month: 8, day: 20 };
const b = { year: 1447, month: 9, day: 1 };

isEqual(a, b); // false
isBefore(a, b); // true
isAfter(a, b); // false
differenceInDays(a, b); // ~10
addDays(a, 5); // { year: 1447, month: 8, day: 25 }
```

`isEqual`, `isBefore` and `isAfter` are pure TypeScript and need no native
module. Import them from `hijri-native/pure` to use them anywhere — tests, server
code, web bundles — with no native dependency at all:

```typescript
import { isEqual, isBefore, isAfter } from 'hijri-native/pure';
```

---

## Testing

Importing this package is side-effect free: the native module is resolved with
`TurboModuleRegistry.get`, so nothing throws until you call a conversion
function. A test that merely imports a module which re-exports `hijri-native`
therefore needs no mock.

To exercise the conversion functions themselves, mock the package:

```typescript
jest.mock('hijri-native', () => ({
  today: () => ({ year: 1447, month: 8, day: 20 }),
  toHijri: () => ({ year: 1447, month: 8, day: 20 }),
  toGregorian: () => ({ year: 2026, month: 2, day: 8 }),
}));
```

Use `isAvailable()` to branch at runtime where the native module may be missing:

```typescript
import { isAvailable, today } from 'hijri-native';

const hijri = isAvailable() ? today('Asia/Riyadh') : null;
```

---

## Types

```typescript
import type { HijriDate } from 'hijri-native';
// { year: number; month: number; day: number }
```

---

## Why hijri-native?

| Feature     | hijri-native      | JS Libraries       |
| ----------- | ----------------- | ------------------ |
| Accuracy    | ✅ Native OS APIs | ⚠️ Algorithm-based |
| Performance | ✅ Native speed   | ⚠️ JS calculations |
| Bundle size | ✅ Zero deps      | ⚠️ Large tables    |
| Umm al-Qura | ✅ iOS & Android  | ⚠️ Limited support |

---

## License

MIT © [Fahad](https://github.com/F2had)
