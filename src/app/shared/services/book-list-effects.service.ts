import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from './book.service';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs';
import { Book } from 'src/app/model/book.interface';
import { BookActions } from 'src/app/state/book/book.constants';


@Injectable({
  providedIn: 'root'
})
export class BookListEffectsService {

  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.loadBooks),
    mergeMap(() => this.bookService.loadBooksFromLS().pipe(
      map((books: Book[]) => {
        console.log('books', books);        
        return { type: BookActions.loadBooksSuccess, payload: { books } };
      }),
      catchError(() => EMPTY)
    ))
  ))
  constructor(
    private readonly bookService: BookService,
    private readonly actions$: Actions
  ) { }
}
