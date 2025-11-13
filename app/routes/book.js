import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;

  async model(params) {
    const book = await this.store.findRecord('book', params.id, {
      include: 'reviews',
    });

    return book;
  }
}
