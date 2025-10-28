import Model, { attr, hasMany } from '@ember-data/model';

export default class BookModel extends Model {
  @attr title;
  @hasMany('author', { async: true, inverse: 'books' }) authors;
  @hasMany('review', { async: true, inverse: null }) reviews;
  @attr genre;
  @attr pages;
  @attr language;
  @attr publisher;
  @attr('date') date;
  @attr isbn;
  @attr averagerating;
}
