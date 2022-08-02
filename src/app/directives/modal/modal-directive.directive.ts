import { ComponentType } from '@angular/cdk/portal';
import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { BookModalComponent } from 'src/app/components/book-modal/book-modal.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { BookEvents } from 'src/app/model/book-events.enum';
import { Book } from 'src/app/model/book.interface';
import { ModalDirEvents } from 'src/app/model/modal-directive-hostlistener-keys.model';
import { ModalService } from 'src/app/shared/services/modal.service';

const REMOVAL_CONFIRMATION_MESSAGE = 'Please, confirm book removal';

@Directive({
  selector: '[appModalDirective]'
})
export class ModalDirectiveDirective {
  @Input() book!: Book;
  @Output() editEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() removeEvent: EventEmitter<Book> = new EventEmitter<Book>();
  @HostListener(ModalDirEvents.editBook) editListener() {
    this.editBook(this.book);
  }
  @HostListener(ModalDirEvents.removeBook) removeListener() {
    this.removeBook(this.book, REMOVAL_CONFIRMATION_MESSAGE);
  }

  constructor(
    private readonly modalService: ModalService
  ) { }


  editBook(book: Book) {
    const ref = this.modalService.openDailog(BookModalComponent, book);
    ref.afterClosed().pipe(first()).subscribe((book?: Book) => {
      if (book) {
        this.editEvent.emit(book);
      }
    })
  }

  removeBook(book:Book, message: string) {
    const ref = this.modalService.openDailog(ConfirmationModalComponent, message);
    ref.afterClosed().pipe(first()).subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.removeEvent.emit(book);
      }
    })
  }
}
