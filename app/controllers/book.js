import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class BookController extends Controller {
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
