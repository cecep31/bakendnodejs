import books from "../models/books.js";
import { nanoid } from "nanoid";

export function getBooksHandler(request, h) {
  const bok = books.map((book) => {
    return {
      id: book.id,
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
  book.insertedAt = new Date().toISOString();
  book.updatedAt = book.createdAt;
  book.finished = false;
  books.push(book);
  return h.response(book).code(201);
}

export function getBookByIdHandler(request, h) {
  const { bookId } = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
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
  const book = books.filter((b) => b.id === bookId)[0];
  newBook = request.payload;

  if (book == undefined) {
    
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
  }

  if(newBook.name == undefined){
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
    book.updatedAt = new Date().toISOString();
    book.reading = newBook.reading;


  h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });

}

export function deleteBookHandler(request, h) {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

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
