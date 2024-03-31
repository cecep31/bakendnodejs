import books from "../models/books.js";
import { nanoid } from "nanoid";

export function getBooksHandler(request, h) {
  if (request.query.name) {
    const book = books.filter((b) =>
      b.name.toLowerCase().includes(request.query.name.toLowerCase())
    );
    const bok = book.map((book) => {
      return {
        id: book.bookId,
        name: book.name,
        publisher: book.publisher,
      };
    });
    return h.response({
      status: "success",
      data: {
        books: bok,
      },
    });
  }

  if (request.query.reading) {
    const book = books.filter((b) => b.reading == request.query.reading);
    const bok = book.map((book) => {
      return {
        id: book.bookId,
        name: book.name,
        publisher: book.publisher,
      };
    });
    return h.response({
      status: "success",
      data: {
        books: bok,
      },
    });
  }

  if (request.query.finished) {
    const book = books.filter((b) => b.finished == request.query.finished);
    const bok = book.map((book) => {
      return {
        id: book.bookId,
        name: book.name,
        publisher: book.publisher,
      };
    });
    return h.response({
      status: "success",
      data: {
        books: bok,
      },
    });
    
  }

  const bok = books.map((book) => {
    return {
      id: book.bookId,
      name: book.name,
      publisher: book.publisher,
    };
  });

  return h.response({
    status: "success",
    data: {
      books: bok,
    },
  });
}

export function addBookHandler(request, h) {
  let book = request.payload;

  if (!book.name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (book.readPage > book.pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  book.bookId = nanoid(16);
  const newdate = new Date().toISOString();
  book.insertedAt = newdate;
  book.updatedAt = newdate;
  book.finished = book.readPage == book.pageCount ? true : false;
  //   console.log(book);
  books.push(book);
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: book.bookId,
      },
    })
    .code(201);
}

export function getBookByIdHandler(request, h) {
  const { bookId } = request.params;
  const getbook = books.filter((b) => b.bookId === bookId)[0];

  if (getbook !== undefined) {
    // console.log(getbook);
    const book = {
      id: getbook.bookId,
      name: getbook.name,
      year: getbook.year,
      publisher: getbook.publisher,
      pageCount: getbook.pageCount,
      readPage: getbook.readPage,
      finished: getbook.finished,
      reading: getbook.reading,
      author: getbook.author,
      summary: getbook.summary,
      insertedAt: getbook.insertedAt,
      updatedAt: getbook.updatedAt,
    };
    // console.log(book);
    return h.response({
      status: "success",
      data: {
        book,
      },
    });
  }

  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
}

export function updateBookHandler(request, h) {
  const { bookId } = request.params;
  const book = books.filter((b) => b.bookId === bookId)[0];
  const newBook = request.payload;

  if (book == undefined) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  if (newBook.name == undefined) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (newBook.readPage > newBook.pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  book.name = newBook.name;
  book.year = newBook.year;
  book.author = newBook.author;
  book.summary = newBook.summary;
  book.publisher = newBook.publisher;
  book.pageCount = newBook.pageCount;
  book.readPage = newBook.readPage;
  book.finished = newBook.readPage == newBook.pageCount ? true : false;
  console.log(newBook.readPage == newBook.pageCount ? true : false);
  console.log(newBook.readPage);
  console.log(newBook.pageCount);
  console.log(book.finished);
  book.updatedAt = new Date().toISOString();
  book.reading = newBook.reading;

  return h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
}

export function deleteBookHandler(request, h) {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.bookId === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  }

  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
}
