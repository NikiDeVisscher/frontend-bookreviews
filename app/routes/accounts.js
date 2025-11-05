import Route from '@ember/routing/route';
import { service } from '@ember/service';
// eslint-disable-next-line ember/no-mixins
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class AccountsRoute extends Route.extend(DataTableRouteMixin) {
  modelName = 'account';

  @service store;

  async model(params) {
    return this.store.findAll('account', params);
  }
}
