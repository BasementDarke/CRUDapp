import { Routes } from "@angular/router";
import { QuotesListing } from "./quotes-listing/quotes";
import { QuotesCreate } from "./quotes-create/quotes-create";
import { QuotesUpdate } from "./quotes-update/quotes-update";

export const QuotesRoutes: Routes = [
    { path: '', component: QuotesListing },
    { path: 'create', component: QuotesCreate },
    { path: 'update/:id', component: QuotesUpdate },
];
