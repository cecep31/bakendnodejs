import { getBooksHandler,addBookHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler } from "../handlers/booksHandler.js";

const router = [
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About page";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
];
export default router;
