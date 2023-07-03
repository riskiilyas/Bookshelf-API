const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class BooksService {
  constructor() {
    this.books = [];

    this.addBook = this.addBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.getBookById = this.getBookById.bind(this);
    this.editBookById = this.editBookById.bind(this);
    this.deleteBookById = this.deleteBookById.bind(this);
  }

  addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
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

    this.books.push(book);

    const isSuccess = this.books.filter((it) => it.id === id).length > 0;

    if (isSuccess) return id;

    throw new InvariantError('Buku gagal ditambahkan');
  }

  getBooks(query) {
    let dataBooks = this.books;

    if (query.name !== undefined) {
      dataBooks = dataBooks.filter(
        (it) => it.name.toLowerCase().includes(query.name.toLowerCase()),
      );
    }

    if (query.reading !== undefined) {
      dataBooks = dataBooks.filter((it) => it.reading === !!Number(query.reading));
    }

    if (query.finished !== undefined) {
      dataBooks = dataBooks.filter((it) => it.finished === !!Number(query.finished));
    }

    return dataBooks.map((it) => ({
      id: it.id,
      name: it.name,
      publisher: it.publisher,
    }));
  }

  getBookById(id) {
    const book = this.books.filter((it) => it.id === id)[0];
    if (!book) throw new NotFoundError('Buku tidak ditemukan');
    return book;
  }

  editBookById(id, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    const index = this.books.findIndex((it) => it.id === id);

    if (index === -1) throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');

    const updatedAt = new Date().toISOString();
    const finished = (pageCount === readPage);

    this.books[index] = {
      ...this.books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
  }

  deleteBookById(id) {
    const index = this.books.findIndex((it) => it.id === id);
    if (index === -1) throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');
    this.books.splice(index, 1);
  }
}

module.exports = BooksService;
