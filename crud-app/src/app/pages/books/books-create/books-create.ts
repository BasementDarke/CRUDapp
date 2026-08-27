import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { BooksApiService } from '../../../shared/services/books.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { toDateOnly, toNgbDateFromDate } from '../../../shared/util/helpers';

@Component({
  selector: 'app-books-create',
  imports: [FormsModule, ReactiveFormsModule, NgbInputDatepicker],
  templateUrl: './books-create.html',
  styleUrl: './books-create.css',
})
export class BooksCreate {
  formBuilder = inject(NonNullableFormBuilder)
  booksService = inject(BooksApiService)
  router = inject(Router)
  readonly toastService = inject(ToastService);

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

  onSubmit(){
    if(this.form.invalid){
      this.toastService.show({message: "Please fill the form correctly.", classname:"bg-danger text-light", delay: 10000 })
      return
    }
    this.booksService.createBook({
      title: this.form.value.title!,
      author: this.form.value.author!,
      publishDate: toDateOnly(this.form.value.publishDate!)
    }).subscribe(() => {
      this.toastService.show({message: "Book added.", classname:"bg-success text-light", delay: 10000 })
      this.router.navigateByUrl('books')
    })
  }
}
