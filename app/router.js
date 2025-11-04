import EmberRouter from '@ember/routing/router';
import config from 'frontend-bookreviews/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('books');
  this.route('book', { path: '/books/:id' });
  this.route('new-book');
  this.route('edit-book', { path: '/edit-book/:id' });
  this.route('new-review', { path: '/new-review/:id' });
  this.route('edit-review', { path: '/edit-review/:id' });
  this.route('login');
  this.route('register');
});
