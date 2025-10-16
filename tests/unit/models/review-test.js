import { setupTest } from 'frontend-bookreviews/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | review', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('review', {});
    assert.ok(model, 'model exists');
  });
});
