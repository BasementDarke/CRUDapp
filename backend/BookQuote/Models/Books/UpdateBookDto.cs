using System.ComponentModel.DataAnnotations;

namespace BookQuote.Models.Books;

public record UpdateBookDto(
    [Required][StringLength(200)] string Title,
    [Required][StringLength(100)] string Author,
    [Required] DateOnly PublishDate
);
