import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { BooksApiService } from '../../../shared/services/books.service';

@Component({
  selector: 'app-books-delete',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './books-delete.html',
  styleUrl: './books-delete.css',
})
export class BooksDelete {
  router = inject(Router)
  private readonly booksService = inject(BooksApiService);
  private route = inject(ActivatedRoute)
  readonly bookId = Number(this.route.snapshot.paramMap.get('id'));
  
  constructor() {
    this.booksService.deleteBook(this.bookId).subscribe()
    this.router.navigateByUrl('books')
  }
}
