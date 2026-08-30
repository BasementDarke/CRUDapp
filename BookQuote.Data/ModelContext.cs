using System.Data;
using Microsoft.EntityFrameworkCore;
using BookQuote.Data.Entities;

namespace BookQuote.Data;

public class ModelContext(DbContextOptions<ModelContext> options): DbContext(options)
{   
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Quote> Quotes => Set<Quote>();
}


