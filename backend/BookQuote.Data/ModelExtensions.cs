using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BookQuote.Data;

public static class ModelExtensions
{
    // Execute any pending migrations
    public static void MigrateDb(this WebApplication App)
    {
        using var scope = App.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ModelContext>();
        dbContext.Database.Migrate();
    }

    // Register Db using appsettings configuration (apperantly this should be done differently)
    public static void AddDb(this WebApplicationBuilder builder)
    {
        var connString = builder.Configuration.GetConnectionString("BookQuote");
        builder.Services.AddSqlite<ModelContext>(connString, b => b.MigrationsAssembly("BookQuote.Data"));
    }
}
