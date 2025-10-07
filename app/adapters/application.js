import RESTAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends RESTAdapter {
  host = 'http://localhost';
  namespace = '';
  port = 80;
}
