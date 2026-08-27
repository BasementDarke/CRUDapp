namespace BookQuote.Data.Entities;

public class Quote
{
    public int Id { get; set; }
    public required string Text {get; set; }
    public required string Origin { get; set; }
}
