import { Routes } from "@angular/router";
import { BooksListing } from "./books-listing/books";
import { BooksCreate } from "./books-create/books-create";
import { BooksUpdate } from "./books-update/books-update";

export const BookRoutes: Routes = [
    { path: '', component: BooksListing },
    { path: 'create', component: BooksCreate },
    { path: 'update/:id', component: BooksUpdate },
];
