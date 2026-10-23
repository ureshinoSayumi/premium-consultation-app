export type FetchSimulationMode = 'success' | 'error';

let mode: FetchSimulationMode = 'success';
const DEFAULT_DELAY_MS = 700;

export function setFetchSimulationMode(next: FetchSimulationMode) {
  mode = next;
}

export function getFetchSimulationMode(): FetchSimulationMode {
  return mode;
}

export async function simulateNetwork<T>(value: T, delayMs = DEFAULT_DELAY_MS): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  if (mode === 'error') {
    // One-shot failure so Retry can succeed after turning the toggle off,
    // or after the home screen resets mode to success.
    throw new Error('Simulated specialist fetch failure');
  }
  return value;
}
