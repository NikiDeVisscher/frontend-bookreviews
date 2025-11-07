import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AccountController extends Controller {
  @service session;
}
