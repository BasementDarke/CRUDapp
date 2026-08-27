import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { BooksApiService } from '../../../shared/services/books.service';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/toast.service';
import { toDateOnly, toNgbDateFromDate, toNgbDateFromString } from '../../../shared/util/helpers';

@Component({
  selector: 'app-books-update',
  imports: [RouterOutlet, AsyncPipe, RouterLink, FormsModule, ReactiveFormsModule, NgbInputDatepicker],
  templateUrl: './books-update.html',
  styleUrl: './books-update.css',
})
export class BooksUpdate {
  formBuilder = inject(NonNullableFormBuilder)
  booksService = inject(BooksApiService)
  router = inject(Router)
  private route = inject(ActivatedRoute)
  readonly toastService = inject(ToastService);

  readonly bookId = Number(this.route.snapshot.paramMap.get('id'))
  book = this.booksService.getBook(this.bookId)
  form = this.formBuilder.group({
    title: this.formBuilder.control<string>('', {
      validators: [Validators.required]
    }),
    author: this.formBuilder.control<string>('', {
      validators: [Validators.required]
    }),
    publishDate: this.formBuilder.control<NgbDateStruct>(toNgbDateFromDate(new Date()), {
      validators: [Validators.required]
    })
  })

  constructor() {
    this.book.subscribe(book => {
      this.form.controls.title.setValue(book.title)
      this.form.controls.author.setValue(book.author)
      this.form.controls.publishDate.setValue(toNgbDateFromString(book.publishDate as unknown as string))
    })
  }

  onSubmit(){
    if(this.form.invalid){
      this.toastService.show({message: "Please fill the form correctly.", classname:"bg-danger text-light", delay: 10000 })
      return
    }
    this.booksService.putBook(this.bookId, {
      title: this.form.value.title!,
      author: this.form.value.author!,
      publishDate: toDateOnly(this.form.value.publishDate!)
    }).subscribe(() => {
      this.toastService.show({message: "Book edited.", classname:"bg-success text-light", delay: 10000 })
      this.router.navigateByUrl('books')
    })
  }
}
