import { describe, test, expect, mock } from 'bun:test';

// The registry returns nothing, standing in for any environment without the
// native binary linked — Jest, SSR, a web bundle.
mock.module('react-native', () => ({
  TurboModuleRegistry: {
    get: () => null,
    getEnforcing: () => {
      throw new Error('native module not found');
    },
  },
}));

describe('importing the package without a native binary', () => {
  test('does not throw', async () => {
    // Resolving the module is the assertion: with getEnforcing at the top level
    // this rejects before a single export is read.
    const mod = await import('../index');
    expect(typeof mod.today).toBe('function');
  });

  test('reports the native module as unavailable', async () => {
    const { isAvailable } = await import('../index');
    expect(isAvailable()).toBe(false);
  });

  test('pure helpers work with no native module at all', async () => {
    const { isBefore } = await import('../index');
    expect(
      isBefore({ year: 1447, month: 1, day: 1 }, { year: 1448, month: 1, day: 1 })
    ).toBe(true);
  });

  test('validation still runs before the native call is attempted', async () => {
    const { today } = await import('../index');
    // A bad timezone must fail validation, not the missing-module guard.
    expect(() => today('')).toThrow(/Timezone must be a non-empty IANA string/);
  });

  test('calling a native method raises a clear, actionable error', async () => {
    const { today } = await import('../index');
    expect(() => today('Asia/Riyadh')).toThrow(/native module isn't available/);
  });
});
