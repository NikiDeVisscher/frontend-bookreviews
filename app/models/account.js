import Model, { attr, belongsTo } from '@ember-data/model';

const STATUS_LABELS = {
  'http://mu.semte.ch/vocabularies/account/status/active': true,
  'http://mu.semte.ch/vocabularies/account/status/inactive': false,
};

export default class AccountModel extends Model {
  @attr nickname;
  @attr password;
  @attr salt;
  @attr status;
  @attr created;
  @attr modified;
  @belongsTo('person', { async: true, inverse: 'accounts' }) person;

  get statusLabel() {
    return STATUS_LABELS[this.status];
  }
}
