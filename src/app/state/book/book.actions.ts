import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import { BookActions } from "./book.constants";

export const editBook = createAction(BookActions.editBook, props<Book>());
export const removeBook = createAction(BookActions.removeBook, props<Book>());
export const addBook = createAction(BookActions.addBook, props<Book>());