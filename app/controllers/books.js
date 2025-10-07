import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
// eslint-disable-next-line ember/no-mixins
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default class BooksController extends Controller.extend(
  DefaultQueryParamsMixin,
) {
  @service router;

  page = 0;
  size = 10;

  //find out how to sort
  @action
  navigate(book) {
    this.router.transitionTo('book', book.id);
  }
}
