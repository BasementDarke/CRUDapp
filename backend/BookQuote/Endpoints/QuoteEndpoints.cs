using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using BookQuote.Data;
using BookQuote.Data.Entities;
using BookQuote.Models.Quotes;

namespace BookQuote.Endpoints;

public static class QuoteEndpoints
{
    const string GetQuoteByIdEndpointName = "GetQuoteById";

    private static bool IsFormRequestValid(CreateQuoteDto quote)
    {
        if(string.IsNullOrEmpty(quote.Text) || string.IsNullOrEmpty(quote.Origin))
        {
            return false;
        }
        return true;
    }

    private static bool IsFormRequestValid(UpdateQuoteDto quote)
    {
        if(string.IsNullOrEmpty(quote.Text) || string.IsNullOrEmpty(quote.Origin))
        {
            return false;
        }
        return true;
    }

    public static void MapQuotesEndpoints(this WebApplication app)
    {
        var routeGroup = app.MapGroup("/api/quotes").RequireAuthorization();
        // GET / Quotes/
        routeGroup.MapGet("/", async (ModelContext dbContext)
            => await dbContext.Quotes
            .Select(quote => new QuoteDto(
                quote.Id,
                quote.Text,
                quote.Origin
            ))
            .AsNoTracking()
            .ToListAsync()
        );


        // GET / quotes/{id}
        routeGroup.MapGet("/{id}", async (int id, ModelContext dbContext) =>
        {
            var quote = await dbContext.Quotes.FindAsync(id);
            return quote is null ? Results.NotFound() : Results.Ok(
                new QuoteDto(
                    quote.Id,
                    quote.Text,
                    quote.Origin
                )
            );
        })
        .WithName(GetQuoteByIdEndpointName);


        // POST / quotes
        routeGroup.MapPost("/", async (CreateQuoteDto newQuote, ModelContext dbContext) =>
        {
            if (!IsFormRequestValid(newQuote))
            {
                return Results.BadRequest("Form request missing input fields");
            }

            Quote quote = new()
            {
                Text = newQuote.Text,
                Origin = newQuote.Origin
            };
            dbContext.Quotes.Add(quote);
            await dbContext.SaveChangesAsync();

            QuoteDto quoteDto = new(
                quote.Id,
                quote.Text,
                quote.Origin
            );
            return Results.CreatedAtRoute(GetQuoteByIdEndpointName, new {id = quoteDto.Id}, quoteDto);
        });


        // PUT / quotes/{id}
        routeGroup.MapPut("/{id}", async (int id, UpdateQuoteDto updatedQuote, ModelContext dbContext) =>
        {
            if (!IsFormRequestValid(updatedQuote))
            {
                return Results.BadRequest("Form request missing input fields");
            }

            var exisitngQuote = await dbContext.Quotes.FindAsync(id);
            if (exisitngQuote == null)
            {
                return Results.NotFound();
            }

            exisitngQuote.Text = updatedQuote.Text;
            exisitngQuote.Origin = updatedQuote.Origin;
            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });


        // DELETE / quotes/{id}
        routeGroup.MapDelete("/{id}", async (int id, ModelContext dbContext) =>
        {
            await dbContext.Quotes
                            .Where(quote => quote.Id == id)
                            .ExecuteDeleteAsync();
            return Results.NoContent();
        });   
    }
}
