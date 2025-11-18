import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class RegisterRoute extends Route {
  @service session;
  @service currentUser;

  async beforeModel() {
    if (this.session.isAuthenticated && !this.currentUser.user) {
      await this.currentUser.load();
    }
  }
}
