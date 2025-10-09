import { module, test } from 'qunit';
import { setupTest } from 'frontend-bookreviews/tests/helpers';

module('Unit | Route | NewBook', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:new-book');
    assert.ok(route);
  });
});
