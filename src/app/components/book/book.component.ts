import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookEvents } from '../../model/book-events.enum';
import { Book } from '../../model/book.interface';
import { columnsToDisplay, propsToRender } from './book.component.constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Output() editBook: EventEmitter<BookEvents.editBook> = new EventEmitter<BookEvents.editBook>();
  @Output() removeBook: EventEmitter<BookEvents.removeBook> = new EventEmitter<BookEvents.removeBook>();
  @Input() set book(bk: Book) {
    this.dataSource.data = this.buildDataSource(bk);
  }

  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = columnsToDisplay;
  bookEvents = BookEvents;
  constructor() { }

  buildDataSource(book: Book) {
    const DS = [];
    for (const field in book) {
      if (propsToRender.includes(field)) {
        DS.push({ name: field, data: book[field] })
      }
    }
    return DS;
  }

}
