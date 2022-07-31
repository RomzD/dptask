import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import { BookListActions } from "./book-list.constants";


export const loadBooks = createAction(BookListActions.loadBooks);
export const loadBooksSuccess = createAction(BookListActions.loadBooksSuccess, props<{ books: Book[] }>());
