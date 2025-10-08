import Model, { attr, hasMany } from '@ember-data/model';

export default class AuthorModel extends Model {
  @attr('string') name;
  @hasMany('accounts', { async: true, inverse: null }) accounts;
  @hasMany('book', { async: true, inverse: 'authors' }) books;
}
