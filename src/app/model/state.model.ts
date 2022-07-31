import { Observable } from "rxjs";
import { Book } from "./book.interface";

export interface StateModel {
    book: Observable<Book[]>
}