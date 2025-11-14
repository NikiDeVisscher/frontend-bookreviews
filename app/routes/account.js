import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AccountRoute extends Route {
  @service session;
  @service store;

  model() {
    const accountId =
      this.session.data.authenticated.data.relationships.account.data.id;
    const account = this.store.findRecord('account', accountId, {
      include: 'person',
    });
    return account;
  }
}
