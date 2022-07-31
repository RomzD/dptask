import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from 'src/app/model/book.interface';

const BOOK_KEY = 'Books';
const LOAD_BOOKS_ERR_MSG = 'Unable to load books';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBooksFromLS(): Observable<Book[]> {
    console.log('in getBooksFromLS');
    
    const books = localStorage.getItem(BOOK_KEY);
    if (books){
      console.log(JSON.parse(books))
    }
  return books ? of(JSON.parse(books)) : throwError(()=> LOAD_BOOKS_ERR_MSG);
  
  }

}
