using BookQuote.Authentication.Models;

namespace BookQuote.Authentication.Services;

public interface IJwtService
{
    string CreateToken(User user);
}
