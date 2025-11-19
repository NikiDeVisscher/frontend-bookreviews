import MuLoginComponent from 'ember-mu-login/components/mu-login';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MyMuLoginComponent extends MuLoginComponent {
  @service currentUser;

  @action
  updateNickname(e) {
    this.nickname = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

  @action
  async login(e) {
    e.preventDefault();
    await super.login(e);
    await this.currentUser.load();
  }
}
