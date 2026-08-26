namespace BookQuote.Data.Entities;

public class Book
{
    public int Id { get; set; }
    public required string Title {get; set; }
    public required string Author { get; set; }
    public required DateOnly PublishDate { get; set; }
    // Include genre feature?
}
