import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class Reviews extends Component {
  @service router;

  @action
  editReview(review) {
    this.router.transitionTo('edit-review', review.id);
  }

  @action
  async deleteReview(review) {
    if (confirm('Are you sure you want to delete this review?')) {
      await review.destroyRecord();
    }
  }
}
