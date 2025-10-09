import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class NewBookController extends Controller {
  @tracked title = '';

  printData = (input) => {
    this.title = input.target.value;
    console.log(this.title);
  };
}
