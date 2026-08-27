using System.ComponentModel.DataAnnotations;

namespace BookQuote.Models.Quotes;

public record CreateQuoteDto(
    [Required][StringLength(400)] string Text,
    [Required][StringLength(200)] string Origin
);
