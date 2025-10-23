import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class EditReviewController extends Controller {
  @service router;
  @service store;
}
