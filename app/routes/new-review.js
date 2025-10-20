import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NewReviewRoute extends Route {
  @service store;
  @service router;

  async setupController(controller) {
    super.setupController(...arguments);

    controller.newReview = {
      reviewcontent: '',
      reviewrating: null,
      book: await this.store.findRecord('book', {
        id: this.router.currentRoute.params.id,
      }),
      datecreated: new Date(),
      author: null,
    };
  }
}
