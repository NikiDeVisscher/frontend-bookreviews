import Controller from '@ember/controller';
import { action } from '@ember/object';
// eslint-disable-next-line ember/no-mixins
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default class AccountsController extends Controller.extend(
  DefaultQueryParamsMixin,
) {
  page = 0;
  size = 10;

  @action
  deleteAccount(account) {
    if (
      confirm(
        `Are you sure you want to delete the account: ${account.accountname}?`,
      )
    ) {
      account.destroyRecord();
    }
  }
}
