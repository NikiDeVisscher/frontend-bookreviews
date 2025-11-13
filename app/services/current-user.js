import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentUserService extends Service {
  @service store;
  @service session;

  @tracked user = null;

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
