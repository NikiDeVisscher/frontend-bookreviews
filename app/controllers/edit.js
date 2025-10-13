import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class EditBookController extends Controller {
  @service router;

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
