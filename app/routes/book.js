import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;

  async model(params) {
    //return this.store.findRecord('book', params.id);
    const book = await this.store.findRecord('book', params.id);
    try {
      const authors = await fetch(`http://localhost/book/${params.id}/authors`);
      console.log('authors response', await authors.text());
    } catch (e) {
      console.error('Manual fetch failed', e);
    }
    return book;
  }
}
