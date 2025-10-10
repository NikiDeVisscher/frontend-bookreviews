import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-bookreviews/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-author', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AddAuthor />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AddAuthor>
        template block text
      </AddAuthor>
    `);

    assert.dom().hasText('template block text');
  });
});
