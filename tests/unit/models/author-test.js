import { setupTest } from 'frontend-bookreviews/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | author', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('author', {});
    assert.ok(model, 'model exists');
  });
});
