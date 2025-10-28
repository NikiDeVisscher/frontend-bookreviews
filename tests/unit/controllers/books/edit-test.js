import { module, test } from 'qunit';
import { setupTest } from 'frontend-bookreviews/tests/helpers';

module('Unit | Controller | books/edit', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:books/edit');
    assert.ok(controller);
  });
});
