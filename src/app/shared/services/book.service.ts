import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from 'src/app/model/book.interface';

const BOOKS_KEY = 'Books';
const LOAD_BOOKS_ERR_MSG = 'Unable to load books';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() { }

  loadBooksFromLS(): Observable<Book[]> {
    const books = this.getBooksFromLS();
    return books ? of(books) : throwError(() => LOAD_BOOKS_ERR_MSG);
  }

  addBook(book: Book): Observable<Book> {
    const books: Book[] = this.getBooksFromLS() || [];
    const newBookSet: Book[] = [...books, book]
    this.writeToLocalStorage(newBookSet);
    return of(book);
  }

  removeBook(book: Book): Observable<Book> {
    const books: Book[] = this.getBooksFromLS()!;
    const newBookSet = books.reduce(((acc: Book[], bk: Book) => {
      if (!(bk.id === book.id)) {
        return acc;
      }
      acc.push(bk);
      return acc
    }), [])
    this.writeToLocalStorage(newBookSet);
    return of(book)
  }

  editBook(book: Book): Observable<Book> {
    const books: Book[] = this.getBooksFromLS()!;
    const newBookSet = books.reduce(((acc: Book[], bk: Book) => {
      if (!(bk.id === book.id)) {
        acc.push(book);
        return acc;
      }
      acc.push(bk);
      return acc
    }), [])
    this.writeToLocalStorage(newBookSet);
    return of(book);
  }

  private writeToLocalStorage(books: Book[]) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
  }

  private getBooksFromLS(): Book[] | null {
    return this.booksJSONtoObj(localStorage.getItem(BOOKS_KEY));
  }

  private booksJSONtoObj(json: string | null): Book[] | null {
    if (!json) {
      return null;
    }
    return JSON.parse(json);
  }



}
