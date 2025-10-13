import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NewBookController extends Controller {
  @service store;
  @service router;

  @tracked filteredAuthors = [];
  @tracked selectedAuthors = [];
  @tracked showAddAuthor = false;
  @tracked authorSearch = '';

  @action
  toggleAddAuthor() {
    this.showAddAuthor = !this.showAddAuthor;
  }

  @action
  updateField(field, event) {
    this.newBook[field] = event.target.value;
  }

  @action
  async searchAuthors(e) {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      this.filteredAuthors = [];
      return;
    }

    const allAuthors = await this.store.findAll('author');
    this.filteredAuthors = allAuthors.filter((author) =>
      author.name.toLowerCase().includes(query),
    );
  }

  @action
  selectAuthors(event) {
    const selectedIds = Array.from(event.target.selectedOptions).map(
      (opt) => opt.value,
    );
    const allAuthors = this.store.peekAll('author');
    const selectedAuthor = allAuthors.filter((author) =>
      selectedIds.includes(author.id),
    );
    this.addAuthor(selectedAuthor[0]);
    this.authorSearch = '';
    event.target.value = '';
  }

  @action
  addNewAuthor(author) {
    this.addAuthor(author);
    this.toggleAddAuthor();
  }

  @action
  addAuthor(author) {
    if (!this.selectedAuthors.includes(author)) {
      this.selectedAuthors = [...this.selectedAuthors, author];
    }
    this.filteredAuthors = [];
  }

  @action
  async addBook() {
    try {
      let book = this.store.createRecord('book', {
        title: this.newBook.title,
        authors: this.selectedAuthors,
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
