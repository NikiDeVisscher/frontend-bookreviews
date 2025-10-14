import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class EditAuthor extends Component {
  @service store;

  @action
  updateField(field, event) {
    this.args.author[field] = event.target.value;
  }

  @action
  updateAuthor() {
    if (this.args.onUpdate) {
      this.args.onUpdate(this.args.author);
    }
  }
}
