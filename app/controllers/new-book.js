import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class NewBookController extends Controller {
  @service store;
  @service router;

  @action
  updateField(field, event) {
    this.newBook[field] = event.target.value;
  }

  @action
  async addBook() {
    try {
      let book = this.store.createRecord('book', {
        title: this.newBook.title,
        genre: this.newBook.genre,
        pages: Number(this.newBook.pages),
        language: this.newBook.language,
        publisher: this.newBook.publisher,
        date: new Date(this.newBook.date),
        isbn: this.newBook.isbn,
      });

      await book.save();
      this.router.transitionTo('books');
    } catch (e) {
      console.error('Error saving book:', e);
    }
  }
}
