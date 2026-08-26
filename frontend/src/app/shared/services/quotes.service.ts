import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuoteCreateDto, QuoteDto, QuoteUpdateDto } from '../models/quote.model';
import { ApiUrls } from '../constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesApiService {
  private readonly http = inject(HttpClient);

  public getQuotes(): Observable<QuoteDto[]> {
    return this.http.get<QuoteDto[]>(ApiUrls.QuotesUrl);
  }

  public createQuote(requestBody: QuoteCreateDto): Observable<unknown> {
    return this.http.post(ApiUrls.QuotesUrl, requestBody);
  }

  public getQuote(bookId: number): Observable<QuoteDto> {
    return this.http.get<QuoteDto>(ApiUrls.QuotesUrl+`/${bookId}`);
  }

  public putQuote(bookId: number, requestBody: QuoteUpdateDto): Observable<unknown> {
    return this.http.put(ApiUrls.QuotesUrl+`/${bookId}`, requestBody);
  }

  public deleteQuote(quoteId: number): Observable<unknown> {
    return this.http.delete(ApiUrls.QuotesUrl+`/${quoteId}`)
  }
}
