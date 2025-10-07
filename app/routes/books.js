import Route from '@ember/routing/route';
import { service } from '@ember/service';
// eslint-disable-next-line ember/no-mixins
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class BooksRoute extends Route.extend(DataTableRouteMixin) {
  modelName = 'book';

  @service store;

  async model() {
    return this.store.findAll('book');
  }
}
