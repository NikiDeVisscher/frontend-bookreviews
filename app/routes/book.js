import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;
  @service session;
  @service currentUser;

  async beforeModel() {
    if (this.session.isAuthenticated && !this.currentUser.user) {
      await this.currentUser.load();
    }
  }

  async model(params) {
    const book = await this.store.findRecord('book', params.id, {
      include: 'reviews',
    });

    return book;
  }
}
