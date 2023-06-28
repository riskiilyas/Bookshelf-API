class BooksHandler {
  constructor(service) {
    this.service = service;

    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.putBookByIdHandler = this.putBookByIdHandler.bind(this);
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this);
  }

  postBookHandler(request, h) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      return response;
    }

    try {
      const bookId = this.service.addBook({
        name, year, author, summary, publisher, pageCount, readPage, reading,
      });

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(500);
      return response;
    }
  }

  getBooksHandler(request, h) {
    const dataBooks = this.service.getBooks(request.query);
    const response = h.response({
      status: 'success',
      data: {
        books: dataBooks.map((it) => ({ id: it.id, name: it.name, publisher: it.publisher })),
      },
    });
    response.code(200);
    return response;
  }

  getBookByIdHandler(request, h) {
    const { id } = request.params;

    try {
      const book = this.service.getBookById(id);
      const response = h.response({
        status: 'success',
        data: { book },
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putBookByIdHandler(request, h) {
    const { id } = request.params;
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });

      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      return response;
    }

    try {
      this.service.editBookById(id, {
        name, year, author, summary, publisher, pageCount, readPage, reading,
      });

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });

      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  deleteBookByIdHandler(request, h) {
    const { id } = request.params;

    try {
      this.service.deleteBookById(id);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });

      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }
}

module.exports = BooksHandler;
