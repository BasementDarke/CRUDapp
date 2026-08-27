export class ApiUrls {
    static readonly ApiBaseUrl = "/api"
    static readonly BooksUrl = `${ApiUrls.ApiBaseUrl}/books`
    static readonly BookGetUrl = `${ApiUrls.ApiBaseUrl}/books/`
    static readonly BookPutUrl = `${ApiUrls.ApiBaseUrl}/books/`
    static readonly BookDeleteUrl = `${ApiUrls.ApiBaseUrl}/books/`
    
    static readonly QuotesUrl = `${ApiUrls.ApiBaseUrl}/quotes`

    static readonly RegisterUrl = `${ApiUrls.ApiBaseUrl}/auth/register`
    static readonly LoginUrl = `${ApiUrls.ApiBaseUrl}/auth/login`
    static readonly MeUrl = `${ApiUrls.ApiBaseUrl}/auth/me`
    static readonly LogoutUrl = `${ApiUrls.ApiBaseUrl}/auth/logout`
}
