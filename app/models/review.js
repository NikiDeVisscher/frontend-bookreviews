import Model, { attr, belongsTo } from '@ember-data/model';

export default class ReviewModel extends Model {
  @attr reviewcontent;
  @attr reviewrating;
  @attr('date') datecreated;
  @belongsTo('book', { async: true, inverse: 'reviews' }) book;
  @belongsTo('author', { async: true, inverse: null }) author;
}
