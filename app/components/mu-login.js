import MuLoginComponent from 'ember-mu-login/components/mu-login';
import { action } from '@ember/object';

export default class MyMuLoginComponent extends MuLoginComponent {
  @action
  updateNickname(e) {
    this.nickname = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }
}
