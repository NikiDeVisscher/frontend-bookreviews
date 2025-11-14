import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NewReviewRoute extends Route {
  @service store;
  @service router;

  async setupController(controller) {
    super.setupController(...arguments);

    let { id } = this.router.currentRoute.params;
    let book = await this.store.findRecord('book', id);

    controller.newReview = {
      reviewcontent: '',
      reviewrating: null,
      book: book,
      datecreated: new Date(),
      account: null,
    };
  }
}
