import Model, { attr, hasMany } from '@ember-data/model';

export default class BookModel extends Model {
  @attr('string') title;
  @hasMany('person', { async: true, inverse: 'books' }) authors;
  @hasMany('review', { async: true, inverse: null }) reviews;
  @attr('string') genre;
  @attr('number') pages;
  @attr('string') language;
  @attr('string') publisher;
  @attr('date') date;
  @attr('string') isbn;
  @attr('number') averagerating;
}
