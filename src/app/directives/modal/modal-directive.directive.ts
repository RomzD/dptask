import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';;
import { first } from 'rxjs/operators';
import { BookModalComponent } from 'src/app/components/book-modal/book-modal.component';
import { Book } from 'src/app/model/book.interface';

type Action = 'remove' | 'edit' | 'add';
@Directive({
  selector: '[appModalDirective]'
})
export class ModalDirectiveDirective {
  @Input() action: Action;
  @Input() book: Book;
  @Output() editEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() removeEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() addEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @HostListener('click') performAction() {
    switch (this.action) {
      case 'edit': this.editBook()
        break;
      case 'remove': this.removeBook(this.book)
        break;
      case 'add': this.addBook(this.book)
        break;
      default:
        break;
    }
  }
  constructor(
    private readonly dialog: MatDialog
  ) { }


  editBook() {
    const ref = this.dialog.open(BookModalComponent, { data: this.book });
    ref.afterClosed().pipe(first()).subscribe((book?: Book) => {
      if (book) {
        this.editEvent.emit(book);
      }
    })
  }

  addBook(book: Book) {
    const ref = this.dialog.open(BookModalComponent, { data: book });
    ref.afterClosed().pipe(first()).subscribe((book?: Book) => {
      if (book) {
        this.addEvent.emit(book);
      }
    })
  }

  removeBook(book: Book) {
    const ref = this.dialog.open(BookModalComponent, { data: book });
    ref.afterClosed().pipe(first()).subscribe((book?: Book) => {
      if (book) {
        this.removeEvent.emit(book);
      }
    })
  }



}
