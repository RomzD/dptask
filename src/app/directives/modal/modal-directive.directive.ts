import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';;
import { first } from 'rxjs/operators';
import { BookModalComponent } from 'src/app/components/book-modal/book-modal.component';
import { BookEvents } from 'src/app/model/book-events.enum';
import { Book } from 'src/app/model/book.interface';
import { ModalDirEvents } from 'src/app/model/modal-directive-hostlistener-keys.model';
const removeBook = BookEvents.removeBook as const
@Directive({
  selector: '[appModalDirective]'
})
export class ModalDirectiveDirective {
  @Input() book!: Book;
  @Output() editEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() removeEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @HostListener(ModalDirEvents.editBook) editListener() {
    this.performBookAction(this.book, BookEvents.editBook);
  }
  @HostListener(ModalDirEvents.removeBook) removeListener() {
    this.performBookAction(this.book, BookEvents.removeBook);
  }

  constructor(
    private readonly dialog: MatDialog
  ) { }


  performBookAction(book: Book, action: BookEvents) {
    const ref = this.dialog.open(BookModalComponent, { data: book });
    ref.afterClosed().pipe(first()).subscribe((book?: Book) => {
      if (book) {
        action === ModalDirEvents.editBook ? this.editEvent.emit(book) : this.removeEvent.emit(book);
      }
    })
  }


}
