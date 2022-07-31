import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import { loadBooks, loadBooksSuccess } from "./book-list.actions";
import { cloneDeep } from "lodash";

export const initialState: Book[] = [];

export const booksRecuder = createReducer(
    initialState,
    on(loadBooksSuccess, (state: Book[], action: any): Book[] => {
        const newState = [...state, ...action.payload.books]
        return newState;
    })
)