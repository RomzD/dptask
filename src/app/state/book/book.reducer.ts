import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import * as actions from "./book.actions";
import { cloneDeep } from "lodash";

export const initialState: Book[] = [];

export const bookRecuder = createReducer(
    initialState,
    on(actions.addBookSuccess, (state: Book[], action: any): Book[] => {
        const newState = cloneDeep(state);
        newState.push(action.payload.book);
        return newState;
    }),
    on(actions.removeBookSuccess, (state: Book[], action: any): Book[] => {
        const stateCopy = cloneDeep(state);
        const deletedBookId = action.payload.book.id;
        const newState = stateCopy.reduce((acc: Book[], item: Book) => {
            if (!(item.id === deletedBookId)) {
                acc.push(item);
            }
            return acc;
        }, [])
        return newState;
    }),
    on(actions.editBookSuccess, (state: Book[], action: any): Book[] => {
        const stateCopy = cloneDeep(state);
        const book = action.payload;
        const newState = stateCopy.reduce(((acc: Book[], bk: Book) => {
            if ((bk.id === book.id)) {
                acc.push(book)
                return acc;
            }
            acc.push(bk);
            return acc
        }), []);
        return newState;
    }),
    on(actions.loadBooksSuccess, (state: Book[], action: any): Book[] => {
        const stateCopy = cloneDeep(state);
        const newState = [...stateCopy, ...action.payload.books];
        return newState;
    })

)