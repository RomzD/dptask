import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../model/book.interface';
import { columnsToDisplay } from './book.component.constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
  @Input() set book(bk: Book) {
    this.dataSource.data = this.buildDataSource(bk);
  }
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = columnsToDisplay;
  constructor() { }

  ngOnInit(): void {
  }

  buildDataSource(book: Book) {
    const DS = [];
    for (const field in book) {
      DS.push({name:field, data:book[field]})
    }
    return DS;
  }

}
