import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Reviews extends Component {
  @service router;
  @service currentUser;

  @tracked otherReviews = [];
  @tracked userReviews = [];

  constructor() {
    super(...arguments);
    this.loadUserReviews();
  }

  async loadUserReviews() {
    const currentUser = this.currentUser.user;
    const reviews = await this.args.book.reviews;
    for (const review of reviews) {
      await review.account;
    }

    if (currentUser) {
      this.userReviews = reviews.filter(
        (review) => review.account.id === currentUser.id,
      );

      this.otherReviews = reviews.filter(
        (review) => review.account.id !== currentUser.id,
      );
    } else {
      this.otherReviews = this.args.book.reviews;
    }
  }

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
