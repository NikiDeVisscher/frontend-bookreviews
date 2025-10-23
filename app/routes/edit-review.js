import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class EditReviewRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('review', params.id);
  }
}
