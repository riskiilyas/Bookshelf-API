const BooksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const booksHandler = new BooksHandler(service, validator);
    server.route(routes(booksHandler));
  },
};
