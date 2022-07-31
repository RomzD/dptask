import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import { editBook, removeBook, addBook } from "./book.actions";
import { cloneDeep } from "lodash";

export const initialState: Book[] = [];

export const bookRecuder = createReducer(
    initialState,
    on(removeBook, (state: Book[], payload: Book): Book[] => {
        const stateCopy = cloneDeep(state);
        return stateCopy.reduce((acc: Book[], item: Book) => {
            if (!(item.id === payload.id)) {
                acc.push(item);
            }
            return acc;
        }, [])
    }),
    on(editBook, (state: Book[], payload: Book) => {
        const newState = cloneDeep(state);
        const book: Book | undefined = newState.find((book: Book) => book.id === payload.id);
        if (book) {
            for (let prop in book) {
                book[prop] = payload[prop];
            }
        }
        return newState;
    }),
    on(addBook, (state: Book[], payload: Book): Book[]=> {
        const stateCopy = cloneDeep(state);
        stateCopy.push(payload);
        return stateCopy;
    })

)