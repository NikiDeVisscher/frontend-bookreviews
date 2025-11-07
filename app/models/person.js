import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr name;
  @attr created;
  @attr modified;
  @hasMany('account', { async: true, inverse: 'person' }) accounts;
}
