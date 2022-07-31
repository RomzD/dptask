import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookActions } from 'src/app/state/book/book.constants';
import { BookService } from './book.service';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs';
import { Book } from 'src/app/model/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookEffectsService {
  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.addBook),
    mergeMap((book: Book) => this.bookService.addBook(book).pipe(
      map((book: Book) => {
        return { type: BookActions.addBookSuccess, payload: { book } };
      }),
      catchError(() => EMPTY)
    ))
  ))

  removeBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.removeBook),
    mergeMap((book: Book) => this.bookService.removeBook(book).pipe(
      map((book: Book) => {
        return { type: BookActions.removeBookSuccess, payload: { book } };
      }),
      catchError(() => EMPTY)
    ))
  ))

  editBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.editBook),
    mergeMap((book: Book) => this.bookService.editBook(book).pipe(
      map((book: Book) => {
        return { type: BookActions.editBookSuccess, payload: { book } };
      }),
      catchError(() => EMPTY)
    ))
  ))

  constructor(
    private readonly actions$: Actions,
    private readonly bookService: BookService
  ) { }

}
