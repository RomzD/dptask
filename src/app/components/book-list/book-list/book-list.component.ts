import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from 'src/app/model/book.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { addBook, editBook, removeBook } from 'src/app/state/book/book.actions';
import { BookModalComponent } from '../../book-modal/book-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]> = this.store.select((state: any) => state.book)
  constructor(
    private readonly store: Store,
    private readonly dialog: ModalService
  ) { }

  ngOnInit(): void { }

  removeBook(book: Book) {
    this.store.dispatch(removeBook(book));     
  }

  editBook(book: Book) {
    this.store.dispatch(editBook(book));
  }

  addBook() {
    const dialogRef = this.dialog.openDailog(BookModalComponent);
    dialogRef.afterClosed().subscribe((book?: Book | null) => {
      if (book) {
        this.store.dispatch(addBook(book));
      }
    })
  }

}
