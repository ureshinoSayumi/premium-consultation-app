/**
 * Synchronous gate that ensures at most one open attempt per dialog key.
 *
 * Why this works for rapid double-taps / programmatic double-fire:
 * - `tryOpen` is sync and checks+sets in one turn of the JS event loop.
 * - A second call with the same key returns false while the first is open.
 * - Closing removes the key so a later intentional open can succeed.
 *
 * Bonus — multiple buttons / multiple dialogs:
 * - Use distinct keys (e.g. "coming-soon", "offline"). Each key is independent.
 * - Shared host can call tryOpen(key) from any button; same key still dedupes.
 * - Optional: a single `anyOpen` mutex if product wants only one dialog globally.
 */
export type DialogKey = string;

export type DialogGate = {
  tryOpen: (key: DialogKey) => boolean;
  close: (key: DialogKey) => void;
  isOpen: (key: DialogKey) => boolean;
  reset: () => void;
};

export function createDialogGate(): DialogGate {
  const openKeys = new Set<DialogKey>();

  return {
    tryOpen(key) {
      if (openKeys.has(key)) {
        return false;
      }
      openKeys.add(key);
      return true;
    },
    close(key) {
      openKeys.delete(key);
    },
    isOpen(key) {
      return openKeys.has(key);
    },
    reset() {
      openKeys.clear();
    },
  };
}

/** App-wide gate so multiple entry buttons share the same Coming soon instance. */
export const appDialogGate = createDialogGate();
