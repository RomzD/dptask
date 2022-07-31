import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import { BookActions } from "./book.constants";

export const editBook = createAction(BookActions.editBook, props<Book>());
export const editBookSuccess = createAction(BookActions.editBookSuccess, props<Book>());
export const removeBook = createAction(BookActions.removeBook, props<Book>());
export const removeBookSuccess = createAction(BookActions.removeBookSuccess, props<Book>());
export const addBook = createAction(BookActions.addBook, props<Book>());
export const addBookSuccess = createAction(BookActions.addBookSuccess, props<Book>());
export const loadBooks = createAction(BookActions.loadBooks);
export const loadBooksSuccess = createAction(BookActions.loadBooksSuccess, props<{ books: Book[] }>());