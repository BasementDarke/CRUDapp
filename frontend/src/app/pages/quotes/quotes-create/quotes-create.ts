import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuotesApiService } from '../../../shared/services/quotes.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-quotes-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './quotes-create.html',
  styleUrl: './quotes-create.css',
})
export class QuotesCreate {
  formBuilder = inject(FormBuilder)
  quotesService = inject(QuotesApiService)
  router = inject(Router)
  readonly toastService = inject(ToastService);


  form = this.formBuilder.group({
    text: this.formBuilder.control<string>('', {
      validators: [Validators.required]
    }),
    origin: this.formBuilder.control<string>('', {
      validators: [Validators.required]
    })
  })

  onSubmit(){
    if(this.form.invalid){
      this.toastService.show({message: "Please fill the form correctly.", classname:"bg-danger text-light", delay: 10000 })
      return
    }
    this.quotesService.createQuote({
      text: this.form.value.text!,
      origin: this.form.value.origin!,
    }).subscribe(() => {
      this.toastService.show({message: "Quote added.", classname:"bg-success text-light", delay: 10000 })
      this.router.navigateByUrl('quotes')
    })
  }
}
