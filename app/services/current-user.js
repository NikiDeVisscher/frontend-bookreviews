import Service from '@ember/service';
import { service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service store;
  @service session;

  user = null;

  async load() {
    if (this.session.isAuthenticated) {
      const accountId =
        this.session.data.authenticated.data.relationships.account.data.id;
      this.user = await this.store.findRecord('account', accountId, {
        include: 'person',
      });
    }
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  get isReader() {
    return this.user?.role === 'reader';
  }
}
