using BookQuote.Authentication.Models;

namespace BookQuote.Authentication.Services;

public interface IUserService
{
    User? FindByUsername(string username);

    User Create(string username, string password);

    bool VerifyPassword(User user, string password);
}
