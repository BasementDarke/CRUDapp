export class ApiUrls {
    static readonly ApiBaseUrl = "/api"
    static readonly BooksUrl = `${ApiUrls.ApiBaseUrl}/books`
    static readonly BookGetUrl = `${ApiUrls.ApiBaseUrl}/books/`
    static readonly BookPutUrl = `${ApiUrls.ApiBaseUrl}/books/`
    static readonly BookDeleteUrl = `${ApiUrls.ApiBaseUrl}/books/`
    static readonly QuotesUrl = `${ApiUrls.ApiBaseUrl}/quotes`
    static readonly RegisterUrl = `/auth/register`
    static readonly LoginUrl = `/auth/login`
    static readonly MeUrl = `/auth/me`
    static readonly LogoutUrl = `/auth/logout`
}
