

using System.Security.Claims;
using BookQuote.Authentication.Models;
using BookQuote.Authentication.Services;
using Microsoft.AspNetCore.Mvc;

public static class AuthenticationEndpoints
{
    public static void MapAuthenticationEndpoints(this WebApplication app)
    {
        var routeGroup = app.MapGroup("/api/auth");

        routeGroup.MapPost("/register", async (RegisterRequest request, [FromServices]IUserService userService) => 
        {
            var existingUser =
            userService.FindByUsername(request.Username);

            if (existingUser != null)
            {
                return Results.BadRequest("User already exists.");
            }

            userService.Create(
                request.Username,
                request.Password);

            return Results.Ok("Registered successfully.");
        });

        routeGroup.MapPost("/login", async (LoginRequest request, HttpResponse response, [FromServices] IUserService userService, [FromServices] IJwtService jwtService) => 
        {
            var user = userService.FindByUsername(request.Username);

            if (user == null)
            {
                return Results.Unauthorized();
            }

            var validPassword =
                userService.VerifyPassword(
                    user,
                    request.Password);

            if (!validPassword)
            {
                return Results.Unauthorized();
            }

            var token = jwtService.CreateToken(user);

            response.Cookies.Append(
                "access_token",
                token,
                new CookieOptions
                {
                    HttpOnly = true,

                    // Requires HTTPS
                    Secure = true,

                    SameSite = SameSiteMode.Strict,

                    Expires =
                        DateTimeOffset.UtcNow.AddHours(1)
                });

            return Results.Ok("Logged in.");
        });

        routeGroup.MapGet("/me", (ClaimsPrincipal user) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = user.FindFirstValue(ClaimTypes.Name);

            return Results.Ok(new
            {
                Id = userId,
                Username = username
            });
        }).RequireAuthorization();

        routeGroup.MapPost("/logout", async (HttpResponse response) => 
        {
           response.Cookies.Delete("access_token");
            return Results.Ok("Logged out.");
        });
    }
}
