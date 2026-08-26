using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookQuote.Data;
using BookQuote.Data.Entities;
using BookQuote.Models.Books;

namespace BookQuote.Endpoints;

public static class BookEndpoints
{
    const string GetBookByIdEndpointName = "GetBookById";

    private static bool IsFormRequestValid(CreateBookDto book)
    {
        if(string.IsNullOrEmpty(book.Title) 
            || string.IsNullOrEmpty(book.Author) 
            || string.IsNullOrEmpty(book.PublishDate.ToString()))
        {
            return false;
        }
        return true;
    }

    private static bool IsFormRequestValid(UpdateBookDto book)
    {
        if(string.IsNullOrEmpty(book.Title) 
            || string.IsNullOrEmpty(book.Author) 
            || string.IsNullOrEmpty(book.PublishDate.ToString()))
        {
            return false;
        }
        return true;
    }

    public static void MapBooksEndpoints(this WebApplication app)
    {
        var routeGroup = app.MapGroup("/api/books").RequireAuthorization();

        // GET / books
        routeGroup.MapGet("/", async (ModelContext dbContext) 
            => await dbContext.Books
                .Select(book => new BookDto(
                    book.Id,
                    book.Title,
                    book.Author,
                    book.PublishDate
                ))
                .AsNoTracking() // avoid "saving" retrived objects
                .ToListAsync());


        // GET / books/{id}
        routeGroup.MapGet("/{id}", async (int id, ModelContext dbContext) =>
        {
            var book = await dbContext.Books.FindAsync(id);
            return book is null ? Results.NotFound() : Results.Ok(
                new BookDto(
                    book.Id,
                    book.Title,
                    book.Author,
                    book.PublishDate
                )
            );
        })
        .WithName(GetBookByIdEndpointName);


        // POST / books
        routeGroup.MapPost("/", async (CreateBookDto newBook, ModelContext dbContext) =>
        {
            if (!IsFormRequestValid(newBook))
            {
                return Results.BadRequest("Form request missing input fields");
            }
            // Validate book inputs in another service and save it there as well
            Book book = new()
            {
                Title = newBook.Title,
                Author = newBook.Author,
                PublishDate = newBook.PublishDate
            };
            dbContext.Books.Add(book);
            await dbContext.SaveChangesAsync();

            // Avoid exposing internal data, transfer it over to Dto 
            BookDto bookDto = new(
                book.Id,
                book.Title,
                book.Author,
                book.PublishDate
            );
            return Results.CreatedAtRoute(GetBookByIdEndpointName, new {id = bookDto.Id}, bookDto);
        });


        // PUT / books/{id}
        routeGroup.MapPut("/{id}", async (int id, UpdateBookDto updatedBook, ModelContext dbContext) =>
        {
            if (!IsFormRequestValid(updatedBook))
            {
                return Results.BadRequest("Form request missing input fields");
            }

            var existingBook = await dbContext.Books.FindAsync(id);
            if (existingBook == null)
            {
                return Results.NotFound();
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.PublishDate = updatedBook.PublishDate;
            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });


        // DELETE / books/{id}
        routeGroup.MapDelete("/{id}", async (int id, ModelContext dbContext) =>
        {
            Console.WriteLine(id);
            await dbContext.Books
                            .Where(book => book.Id == id)
                            .ExecuteDeleteAsync();
                            
            return Results.NoContent();
        });
    }
}
