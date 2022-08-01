import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BOOK_MOCK } from 'src/app/components/book/book.component.mock';
import { Book } from 'src/app/model/book.interface';
import { validators } from 'src/app/shared/validators/book-modal.validators';
import { formFieldNames } from './book-modal.constants';
@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {
  bookFormGroup!: FormGroup
  bookMock = BOOK_MOCK;
  formFieldNames = formFieldNames;
  book?: Book
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
  ) { }

  ngOnInit(): void {
    this.book = this.data;
    this.bookFormGroup = this.initializeFormControl(this.data);
  }

  closeForm() {
    this.dialogRef.close();
  }

  submitForm() {
    let book: Partial<Book> = {}
    for (const field in BOOK_MOCK) {
      book[field] = this.bookFormGroup.get(field)?.value;
    }

    book.id = this.book?.id || Date.now();
    this.dialogRef.close(book);
  }


  initializeFormControl(book?: Book): FormGroup {
    let controlTemplate: { [key: string]: any } = {}
    for (const field in BOOK_MOCK) {
      if (field === 'id') {
        continue;
      }
      const fieldType = typeof BOOK_MOCK[field];
      controlTemplate[field] = this.buildFormControl(fieldType, book?.[field]);
    }
    return new FormGroup(controlTemplate);
  }


  private buildFormControl(fieldType: any, value?: string | number) {
    const fcVal = value || null;

    return new FormControl(fcVal, fieldType === 'number'? validators.number : validators.string);
  }
}
