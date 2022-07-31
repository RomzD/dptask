import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/model/book.interface";
import * as actions from "./book.actions";
import { cloneDeep } from "lodash";

export const initialState: Book[] = [];

export const bookRecuder = createReducer(
    initialState,
    on(actions.removeBook, (state: Book[], payload: Book): Book[] => {
        const stateCopy = cloneDeep(state);
        return stateCopy.reduce((acc: Book[], item: Book) => {
            if (!(item.id === payload.id)) {
                acc.push(item);
            }
            return acc;
        }, [])
    }),
    on(actions.editBook, (state: Book[], payload: Book) => {
        const newState = cloneDeep(state);
        const book: Book | undefined = newState.find((book: Book) => book.id === payload.id);
        if (book) {
            for (let prop in book) {
                book[prop] = payload[prop];
            }
        }
        return newState;
    }),
    on(actions.addBookSuccess, (state: Book[], action: any): Book[] => {
        const newState = cloneDeep(state);
        newState.push(action.payload.book)
        return newState;
    }),
    on(actions.removeBookSuccess, (state: Book[], action: any): Book[] => {
        const stateCopy = cloneDeep(state);
        const deletedBookId = action.payload.id;
        const indexOfDeletedBook = stateCopy.find((bk: Book) => bk.id === deletedBookId)!.id;
        const newState =  stateCopy.slice(0, indexOfDeletedBook).concat(stateCopy.slice(deletedBookId+1));
        return newState;
    }),
    on(actions.editBookSuccess, (state: Book[], action: any): Book[] => {
        const stateCopy = cloneDeep(state);
        const book = action.payload;
        const newState = stateCopy.reduce(((acc: Book[], bk: Book) => {
            if (!(bk.id === book.id)) {
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