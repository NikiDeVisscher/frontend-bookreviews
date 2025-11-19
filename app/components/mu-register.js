import MuRegister from 'ember-mu-registration/components/mu-register';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class MyMuRegisterComponent extends MuRegister {
  @service currentUser;
  rolePath = '';
  @tracked errorMessage = null;
  @tracked successMessage = null;
  @tracked loading = false;

  constructor() {
    super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');
    this.rolePath = config['rolePath'] || '/role';
    this.accountBasePath =
      config['ember-mu-registration']?.accountBasePath || '/accounts';
  }

  get allowRoleSelection() {
    return this.currentUser.isAdmin;
  }

  @action
  updateName(e) {
    this.name = e.target.value;
  }

  @action
  updateNickname(e) {
    this.nickname = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

  @action
  updatePasswordConfirmation(e) {
    this.passwordConfirmation = e.target.value;
  }

  @action
  updateRole(e) {
    this.role = e.target.value;
  }

  @action
  async registerAccount(e) {
    e.preventDefault();
    this.successMessage = null;
    this.loading = true;
    this.errorMessage = null;
    const id = await this.register();
    await this.assignReaderRole(id);
  }

  async register() {
    try {
      const response = await fetch(this.accountBasePath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/vnd.api+json' },
        body: JSON.stringify({
          data: {
            type: 'accounts',
            attributes: {
              name: this.name,
              nickname: this.nickname,
              password: this.password,
              'password-confirmation': this.passwordConfirmation,
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].title || 'Registration failed');
      } else {
        const responseData = await response.json();
        const id = responseData.data.id;
        return id;
      }
    } catch (error) {
      this.loading = false;
      console.error('Registration failed: ' + error);
      this.errorMessage = error;
      return;
    }
  }

  async assignReaderRole(id) {
    await fetch(`${this.rolePath}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'accounts',
          id: id,
          attributes: {
            role: 'reader',
          },
        },
      }),
    });

    this.loading = false;
    this.successMessage = 'Registration successful!';
  }
}
