import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service session;
  @service currentUser;

  async beforeModel() {
    await this.currentUser.load();
  }
}
