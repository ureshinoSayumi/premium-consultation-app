import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createDialogGate } from './createDialogGate';

describe('createDialogGate', () => {
  it('allows the first open and blocks a second open for the same key', () => {
    const gate = createDialogGate();

    assert.equal(gate.tryOpen('coming-soon'), true);
    assert.equal(gate.tryOpen('coming-soon'), false);
    assert.equal(gate.tryOpen('coming-soon'), false);
    assert.equal(gate.isOpen('coming-soon'), true);
  });

  it('allows reopen after close', () => {
    const gate = createDialogGate();

    assert.equal(gate.tryOpen('coming-soon'), true);
    gate.close('coming-soon');
    assert.equal(gate.isOpen('coming-soon'), false);
    assert.equal(gate.tryOpen('coming-soon'), true);
  });

  it('treats different keys independently (multi-dialog bonus)', () => {
    const gate = createDialogGate();

    assert.equal(gate.tryOpen('coming-soon'), true);
    assert.equal(gate.tryOpen('offline'), true);
    assert.equal(gate.tryOpen('coming-soon'), false);
    assert.equal(gate.tryOpen('offline'), false);

    gate.close('coming-soon');
    assert.equal(gate.tryOpen('coming-soon'), true);
    assert.equal(gate.tryOpen('offline'), false);
  });

  it('handles rapid programmatic double-fire', () => {
    const gate = createDialogGate();
    const results = [gate.tryOpen('coming-soon'), gate.tryOpen('coming-soon')];

    assert.deepEqual(results, [true, false]);
  });
});
