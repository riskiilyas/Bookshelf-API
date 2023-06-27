const handler = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'ROOT',
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.getBookDetailHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBookHandler,
  }];

module.exports = routes;
