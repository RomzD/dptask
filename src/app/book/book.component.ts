import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Book } from '../model/book.interface';
import { editBook, removeBook } from '../state/book/book.actions';
import { columnsToDisplay } from './book.component.constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  private _book: Book;
  @Input() set book(bk: Book) {
    this._book = bk;
    this.dataSource.data = this.buildDataSource(bk);
  }
  get book() {
    return this._book;
  }

  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = columnsToDisplay;
  constructor(private readonly store: Store) { }

  buildDataSource(book: Book) {
    const DS = [];
    for (const field in book) {
      DS.push({ name: field, data: book[field] })
    }
    return DS;
  }

  removeBook(book: Book) {
    this.store.dispatch(removeBook(book));
  }

  editBook(book: Book) {
    this.store.dispatch(editBook(book));
  }
}
