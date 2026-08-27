namespace BookQuote.Models.Books;

public record BookDto(
    int Id,
    string Title,
    string Author,
    DateOnly PublishDate
);
