import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { QuotesApiService } from '../../../shared/services/quotes.service';

@Component({
  selector: 'app-quotes-delete',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './quotes-delete.html',
  styleUrl: './quotes-delete.css',
})
export class QuotesDelete {
  router = inject(Router)
  private readonly quotesService = inject(QuotesApiService);
  private route = inject(ActivatedRoute)
  readonly qouteId = Number(this.route.snapshot.paramMap.get('id'));
  
  
  constructor() {
    this.quotesService.deleteQuote(this.qouteId).subscribe()
    this.router.navigateByUrl('quotes')
  }
}
