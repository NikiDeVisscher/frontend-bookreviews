import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-bookreviews/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-details', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BookDetails />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <BookDetails>
        template block text
      </BookDetails>
    `);

    assert.dom().hasText('template block text');
  });
});
