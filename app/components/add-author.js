import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AddAuthor extends Component {
  @service store;
  newAuthor = new Object();

  @action
  updateField(field, event) {
    this.newAuthor[field] = event.target.value;
  }

  @action
  addAuthor() {
    try {
      let author = this.store.createRecord('author', {
        name: this.newAuthor.name,
      });
      author.save().then(() => {
        if (this.args.onAdd) {
          this.args.onAdd(author);
        }
      });
    } catch (error) {
      console.error('Error adding author:', error);
    }
  }
}
