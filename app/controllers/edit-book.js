import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditBookController extends Controller {
  @service router;

  @tracked published = this.formatDate(this.model.date);
  @tracked editingAuthor = null;
  @tracked authors = {};
  @tracked removedAuthors = {};
  @tracked errors = {};

  languages = [
    'English',
    'Dutch',
    'French',
    'Spanish',
    'German',
    'Japanese',
    'Ukrainian',
    'Italian',
    'Portuguese',
    'Arabic',
  ];

  set model(value) {
    this._model = value;
    if (value) {
      this.loadAuthors(value);
    }
  }

  get model() {
    return this._model;
  }

  async loadAuthors(book) {
    const authors = await book.authors;
    this.authors = [...authors];
  }

  prepareAuthors() {
    this.model.authors.then((authors) => {
      this.authors = [...authors];
    });
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  @action
  editAuthor(author) {
    this.editingAuthor = author;
  }

  @action
  removeAuthor(author) {
    this.removedAuthors[author.id] = author;
    this.authors = this.authors.filter((a) => a.id !== author.id);
  }

  @action
  async updateAuthor(author) {
    this.editingAuthor = null;
    this.authors = this.authors.map((a) => (a.id === author.id ? author : a));
  }

  @action
  updateField(field, event) {
    this.model[field] = event.target.value;
  }

  @action
  async saveBook() {
    try {
      if (!this.validate()) {
        return;
      }

      for (let author of this.authors) {
        await author.save();
      }

      for (let author in this.removedAuthors) {
        this.removeBookFromAuthor(author);
      }

      this.model.authors = this.authors;

      await this.model.save();
      this.router.transitionTo('book', this.model.id);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  }

  @action
  cancel() {
    this.router.transitionTo('book', this.model.id);
  }

  removeBookFromAuthor(author) {
    if (author.books) {
      author.books.then((books) => {
        author.books = books.filter((b) => b.id !== this.model.id);
        author.save().then(() => {
          console.log('Author updated successfully');
        });
      });
    }
  }

  validate() {
    this.errors = {};

    if (!this.model.title) {
      this.errors.title = 'Title is required';
    }
    if (!this.authors.length) {
      this.errors.authors = 'At least one author is required';
    }
    if (!this.model.genre) {
      this.errors.genre = 'Genre is required';
    }
    if (!this.model.pages || isNaN(Number(this.model.pages))) {
      this.errors.pages = 'Pages must be a number';
    }
    if (!this.model.language) {
      this.errors.language = 'Language is required';
    }
    if (!this.model.publisher) {
      this.errors.publisher = 'Publisher is required';
    }
    if (!this.model.date) {
      this.errors.date = 'Date is required';
    }
    if (!this.model.isbn) {
      this.errors.isbn = 'ISBN is required';
    }

    if (Object.keys(this.errors).length) {
      return false;
    }

    return true;
  }
}
