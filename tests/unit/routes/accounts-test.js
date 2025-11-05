import { module, test } from 'qunit';
import { setupTest } from 'frontend-bookreviews/tests/helpers';

module('Unit | Route | accounts', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:accounts');
    assert.ok(route);
  });
});
