import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AddAuthor extends Component {
  @action
  updateField(field, event) {
    this.args.author[field] = event.target.value;
  }
}
