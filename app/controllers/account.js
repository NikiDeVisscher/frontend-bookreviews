import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccountController extends Controller {
  @service session;

  @tracked isEditing = false;
  @tracked updatedAccount = {};

  @action
  editAccount() {
    this.isEditing = true;
    this.updatedAccount['nickname'] = this.model.nickname;
    this.updatedAccount['password'] = '';
  }

  @action
  updateField(field, event) {
    this.updatedAccount[field] = event.target.value;
  }

  @action
  async saveAccount(e) {
    e.preventDefault();

    let account = this.model;

    try {
      await this.session.authenticate('authenticator:mu-semtech', {
        nickname: this.model.nickname,
        password: this.updatedAccount['password'],
      });
    } catch (e) {
      alert('Invalid password. Please try again.');
      console.error(e);
      return;
    }

    account.setProperties({
      nickname: this.updatedAccount['nickname'],
      password: this.updatedAccount['password'],
    });
    account.save().then(async () => {
      this.isEditing = false;
      this.updatedAccount = {};
    });
  }
}
