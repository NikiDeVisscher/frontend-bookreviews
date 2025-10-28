import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NewBookRoute extends Route {
  @service store;
  @service router;

  setupController(controller) {
    super.setupController(...arguments);

    controller.newBook = {
      title: '',
      genre: '',
      pages: '',
      language: '',
      publisher: '',
      date: '',
      isbn: '',
    };
  }
}
