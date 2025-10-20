import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class NewReviewController extends Controller {
  @service store;
  @service router;
}
