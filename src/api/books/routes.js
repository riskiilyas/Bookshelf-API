const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: () => 'ROOT',
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.putBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBookByIdHandler,
  }];

module.exports = routes;
