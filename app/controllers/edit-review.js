import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditReviewController extends Controller {
  @service router;
  @service store;

  @tracked errors = {};

  @action
  updateField(field, event) {
    this.model[field] = event.target.value;
  }

  @action
  updateRating(event) {
    this.model.reviewrating = parseInt(event.target.value, 10);
  }

  @action
  async saveReview(event) {
    event.preventDefault();

    try {
      if (!this.validate()) {
        return;
      }

      await this.model.save();
      this.router.transitionTo('book', this.model.book.id);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  }

  @action
  cancel() {
    this.router.transitionTo('book', this.model.id);
  }

  validate() {
    this.errors = {};
    if (!this.model.reviewcontent || this.model.reviewcontent.trim() === '') {
      this.errors.reviewcontent = 'Review content is required.';
    }
    if (
      this.model.reviewrating == null ||
      this.model.reviewrating < 1 ||
      this.model.reviewrating > 5
    ) {
      this.errors.reviewrating = 'Rating must be between 1 and 5.';
    }

    if (Object.keys(this.errors).length) {
      return false;
    }

    return true;
  }
}
