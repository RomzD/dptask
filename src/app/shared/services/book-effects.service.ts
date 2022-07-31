import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from './book.service';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs';
import { Book } from 'src/app/model/book.interface';
import { BookListActions } from 'src/app/state/books/book-list.constants';


@Injectable({
  providedIn: 'root'
})
export class BookEffectsService {

  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType('[Books] Load Books'),
    mergeMap(() => this.bookService.getBooksFromLS().pipe(
      map((books: Book[]) => {
        return { type: BookListActions.loadBooksSuccess, payload: { books } };
      }),
      catchError(() => EMPTY)
    ))
  ))
  constructor(
    private readonly bookService: BookService,
    private readonly actions$: Actions
  ) { }
}
