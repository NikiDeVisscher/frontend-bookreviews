import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Reviews extends Component {
  @tracked reviews = this.args.book.reviews || [];
}
