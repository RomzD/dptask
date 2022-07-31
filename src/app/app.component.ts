import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BOOK_MOCK } from './book/book.component.mock';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { Book } from './model/book.interface';
import { StateModel } from './model/state.model';
import { loadBooks, addBook } from './state/book/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bookMock$: Observable<Book[]> = this.store.select((state: any) => state.book)
  title = 'book-list';

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  addBook() {
    const book = {
      id: Date.now(),
      author: 'J.K.Rowling',
      name: 'Harry Potter and the Order of the Phoenix',
      releaseYear: 2007,
      pageCount: 738
    };
    this.store.dispatch(addBook(book));
  }

  openModal(book: Book) {
    const ref = this.dialog.open(BookModalComponent, { data: book })
    ref.afterClosed().subscribe(data => {
      debugger;
    })
  }
}
