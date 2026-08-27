using BookQuote.Authentication.Models;
using Microsoft.AspNetCore.Identity;

namespace BookQuote.Authentication.Services;

public class UserService : IUserService
{
    private readonly List<User> _users = new();
    private readonly PasswordHasher<User> _passwordHasher = new();

    public User? FindByUsername(string username)
    {
        return _users.FirstOrDefault(x =>
            x.Username.Equals(
                username,
                StringComparison.OrdinalIgnoreCase));
    }

    public User Create(string username, string password)
    {
        var user = new User
        {
            Id = _users.Count + 1,
            Username = username
        };

        user.PasswordHash =
            _passwordHasher.HashPassword(user, password);

        _users.Add(user);

        return user;
    }

    public bool VerifyPassword(User user, string password)
    {
        var result =
            _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                password);
        return result == PasswordVerificationResult.Success;
    }
}
