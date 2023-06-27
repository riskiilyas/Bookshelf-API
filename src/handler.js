const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
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

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(book);

  const isSuccess = books.filter((it) => it.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dibuat',
  });

  response.code(500);
  return response;
};

const getBooksHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: { books: books.map((it) => ({ id: it.id, name: it.name, publisher: it.publisher })) },
  });
  response.status(200);
  return response;
};

const getBookDetailHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((it) => it.id === id)[0];
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: { book },
    });

    response.code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
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

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((it) => it.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((it) => it.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Note successfully Edited',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Not Found',
  });

  response.code(404);
  return response;
};

const handler = {
  addBookHandler, getBooksHandler, getBookDetailHandler, editBookHandler, deleteBookHandler,
};

module.exports = handler;
