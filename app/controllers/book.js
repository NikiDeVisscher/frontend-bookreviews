import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BookController extends Controller {
  @service router;
  @service session;
  @service currentUser;

  @tracked hasUserReview = false;

  @action
  handleReviewExists(exists) {
    this.hasUserReview = exists;
  }

  @action
  deleteBook(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this book?')) {
      this.model.destroyRecord().then(() => {
        this.router.transitionTo('books');
      });
    }
  }
}
