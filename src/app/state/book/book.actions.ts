import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";

export const editBook = createAction('[Book] Edit', props<Book>());
export const removeBook = createAction('[Book] Remove', props<Book>());
export const addBook = createAction('[Book] Add', props<Book>())