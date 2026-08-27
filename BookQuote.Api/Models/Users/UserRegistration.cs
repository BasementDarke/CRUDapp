namespace BookQuote.Authentication.Models;

public record RegisterRequest(
    string Username,
    string Password
);
