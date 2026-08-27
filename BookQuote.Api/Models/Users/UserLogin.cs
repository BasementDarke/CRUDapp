namespace BookQuote.Authentication.Models;

public record LoginRequest(
    string Username,
    string Password
);
