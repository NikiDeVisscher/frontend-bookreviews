import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditBookController extends Controller {
  @service router;

  @tracked published = this.formatDate(this.model.date);

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
  async saveBook() {
    try {
      await this.model.save();
      this.router.transitionTo('book', this.model.id);
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book.');
    }
  }

  @action
  cancel() {
    this.router.transitionTo('book', this.model.id);
  }
}
