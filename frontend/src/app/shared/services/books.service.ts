import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCreateDto, BookDto, BookUpdateDto } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  private readonly http = inject(HttpClient);

  public getBooks(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(ApiUrls.BooksUrl,{withCredentials:true});
  }

  public createBook(requestBody: BookCreateDto): Observable<unknown> {
    return this.http.post(ApiUrls.BooksUrl, requestBody);
  }

  public getBook(bookId: number): Observable<BookDto> {
    return this.http.get<BookDto>(ApiUrls.BookGetUrl+`${bookId}`);
  }

  public putBook(bookId: number, requestBody: BookUpdateDto): Observable<unknown> {
    return this.http.put(ApiUrls.BookPutUrl+`${bookId}`, requestBody);
  }

  public deleteBook(bookId: number) {
    return this.http.delete(ApiUrls.BookDeleteUrl+`${bookId}`)
  }
}
