import Model, { attr } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr accountname;
  @attr password;
  @attr salt;
  @attr status;
  @attr created;
  @attr modified;
}
