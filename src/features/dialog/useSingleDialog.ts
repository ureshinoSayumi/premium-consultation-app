import { useCallback, useState } from 'react';

import { appDialogGate, type DialogGate, type DialogKey } from './createDialogGate';

type Options = {
  key: DialogKey;
  gate?: DialogGate;
};

/**
 * UI wrapper around DialogGate.
 * Rapid presses only flip `visible` once until dismiss.
 */
export function useSingleDialog({ key, gate = appDialogGate }: Options) {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    if (!gate.tryOpen(key)) {
      return false;
    }
    setVisible(true);
    return true;
  }, [gate, key]);

  const close = useCallback(() => {
    gate.close(key);
    setVisible(false);
  }, [gate, key]);

  return { visible, open, close };
}
