import { Component, inject, TemplateRef } from '@angular/core';
import { QuotesApiService } from '../../../shared/services/quotes.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quotes',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class QuotesListing {
  private readonly quotesService = inject(QuotesApiService);
  private modalService = inject(NgbModal);

  quote$ = this.quotesService.getQuotes();

  openModalFunction(content: TemplateRef<unknown>) {
    this.modalService.open(content);
  }

  closeModalFunction() {
    this.modalService.dismissAll();
  }

  deleteQuote(id: number){
    this.quotesService.deleteQuote(id).subscribe(() => {
      this.quote$ = this.quotesService.getQuotes()
      this.modalService.dismissAll()
    });
  }
}
