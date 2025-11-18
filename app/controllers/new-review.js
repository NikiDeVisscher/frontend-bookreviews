import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NewReviewController extends Controller {
  @service store;
  @service router;
  @service currentUser;
  @service session;

  @tracked newReview = {};
  @tracked errors = {};

  @action
  updateField(field, event) {
    this.newReview[field] = event.target.value;
  }

  @action
  updateRating(event) {
    this.newReview.reviewrating = parseInt(event.target.value, 10);
  }

  @action
  async submitReview(event) {
    event.preventDefault();

    if (!this.validate()) {
      return;
    }

    if (!this.session.isAuthenticated) {
      return;
    }

    if (!this.currentUser.user) {
      await this.currentUser.load();
    }

    if (this.currentUser.user) {
      this.newReview.account = this.currentUser.user;
    }

    try {
      let review = this.store.createRecord('review', {
        reviewcontent: this.newReview.reviewcontent,
        reviewrating: this.newReview.reviewrating,
        datecreated: this.newReview.datecreated,
        account: this.newReview.account,
        book: this.newReview.book,
      });

      await review.save();
      this.router.transitionTo('book', this.newReview.book.id);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  }

  validate() {
    this.errors = {};
    if (
      !this.newReview.reviewcontent ||
      this.newReview.reviewcontent.trim() === ''
    ) {
      this.errors.reviewcontent = 'Review content is required.';
    }
    if (
      this.newReview.reviewrating == null ||
      this.newReview.reviewrating < 1 ||
      this.newReview.reviewrating > 5
    ) {
      this.errors.reviewrating = 'Rating must be between 1 and 5.';
    }

    if (Object.keys(this.errors).length) {
      return false;
    }

    return true;
  }
}
