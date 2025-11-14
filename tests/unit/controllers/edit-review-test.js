import { module, test } from 'qunit';
import { setupTest } from 'frontend-bookreviews/tests/helpers';

module('Unit | Controller | edit-review', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:edit-review');
    assert.ok(controller);
  });
});
