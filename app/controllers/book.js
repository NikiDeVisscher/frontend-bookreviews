import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BookController extends Controller {
  @service router;
  @service session;
  @service currentUser;

  @action
  async navigateAddReview(event) {
    event.preventDefault();

    if (this.session.isAuthenticated) {
      if (await this.checkUserReview()) {
        alert('You have already submitted a review for this book.');
        return;
      }

      this.router.transitionTo('new-review', this.model.id);
    } else {
      this.router.transitionTo('login');
    }
  }

  async checkUserReview() {
    const reviews = await this.model.reviews;
    for (let review of reviews) {
      await review.account;
    }

    const currentUser = this.currentUser.user;
    let hasUserReview = false;

    if (currentUser) {
      hasUserReview = reviews.some(
        (review) => review.account?.id === currentUser.id,
      );
    }

    return hasUserReview;
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
