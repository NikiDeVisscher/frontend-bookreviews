import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditBookController extends Controller {
  @service router;

  @tracked published = this.formatDate(this.model.date);
  @tracked editingAuthor = null;
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

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  @action
  editAuthor(author) {
    this.editingAuthor = author;
  }

  @action
  removeAuthor(author) {
    console.log('Remove author:', author);
  }

  @action
  async updateAuthor(author) {
    this.editingAuthor = null;
    try {
      await author.save();
    } catch (error) {
      console.error('Error updating author:', error);
    }
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

  validate() {
    this.errors = {};

    if (!this.model.title) {
      this.errors.title = 'Title is required';
    }
    /*if (!this.selectedAuthors.length) {
      this.errors.authors = 'At least one author is required';
    }*/
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
