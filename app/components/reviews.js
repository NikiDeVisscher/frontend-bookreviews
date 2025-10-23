import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Reviews extends Component {
  @action
  async deleteReview(review) {
    if (confirm('Are you sure you want to delete this review?')) {
      await review.destroyRecord();
    }
  }
}
