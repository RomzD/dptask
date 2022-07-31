import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BOOK_MOCK } from './book/book.component.mock';
import { Book } from './model/book.interface';
import { StateModel } from './model/state.model';
import { loadBooks } from './state/books/book-list.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bookMock$: Observable<Book[]> = this.store.select((state: any) => state.books)
  title = 'book-list';

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }
}
