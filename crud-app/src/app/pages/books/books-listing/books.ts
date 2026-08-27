import { Component, inject, TemplateRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BooksApiService } from '../../../shared/services/books.service';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-books',
  imports: [RouterOutlet, AsyncPipe, RouterLink, NgbAlert],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class BooksListing {
  private readonly booksService = inject(BooksApiService);
  readonly toastService = inject(ToastService);
  private modalService = inject(NgbModal);

  book$ = this.booksService.getBooks();

  openModalFunction(content: TemplateRef<unknown>) {
    this.modalService.open(content);
  }

  closeModalFunction() {
    this.modalService.dismissAll();
  }

  deleteBook(id: number){
    this.booksService.deleteBook(id).subscribe(() => {
      this.book$ = this.booksService.getBooks()
      this.modalService.dismissAll()
    });
  }
}
