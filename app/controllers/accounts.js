import Controller from '@ember/controller';
// eslint-disable-next-line ember/no-mixins
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default class AccountsController extends Controller.extend(
  DefaultQueryParamsMixin,
) {
  page = 0;
  size = 10;
}
