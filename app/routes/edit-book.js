import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class EditBookRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('book', params.id);
  }
}
