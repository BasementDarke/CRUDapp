import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { QuotesApiService } from '../../../shared/services/quotes.service';
import { AsyncPipe } from '@angular/common';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-quotes-update',
  imports: [
    RouterOutlet,
    AsyncPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
  ],
  templateUrl: './quotes-update.html',
  styleUrl: './quotes-update.css',
})
export class QuotesUpdate {
  formBuilder = inject(NonNullableFormBuilder);
  quotesService = inject(QuotesApiService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly toastService = inject(ToastService);

  readonly quoteId = Number(this.route.snapshot.paramMap.get('id'));
  quote = this.quotesService.getQuote(this.quoteId);

  form = this.formBuilder.group({
    text: this.formBuilder.control<string>('', {
      validators: [Validators.required],
    }),
    origin: this.formBuilder.control<string>('', {
      validators: [Validators.required],
    }),
  });

  constructor() {
    this.quote.subscribe((quote) => {
      this.form.controls['text'].setValue(quote.text);
      this.form.controls['origin'].setValue(quote.origin);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastService.show({
        message: 'Please fill the form correctly.',
        classname: 'bg-danger text-light',
        delay: 10000,
      });
      return;
    }
    this.quotesService
      .putQuote(this.quoteId, {
        text: this.form.value.text!,
        origin: this.form.value.origin!,
      })
      .subscribe(() => {
        this.toastService.show({
          message: 'Quote edited.',
          classname: 'bg-success text-light',
          delay: 10000,
        });
        this.router.navigateByUrl('quotes');
      });
  }
}
