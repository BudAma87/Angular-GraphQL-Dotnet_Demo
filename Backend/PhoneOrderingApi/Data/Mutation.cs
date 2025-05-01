using Microsoft.EntityFrameworkCore;
using PhoneOrderingApi.Helpers;
using PhoneOrderingApi.Models;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;



namespace PhoneOrderingApi.Data
{
    public class Mutation
    {
        public async Task<string> RegisterAsync(
         string username,
         string password,
         [Service] IDbContextFactory<AppDbContext> contextFactory)
        {
            var db = contextFactory.CreateDbContext();
            if (await db.Users.AnyAsync(u => u.Username == username))
                throw new Exception("User already exists.");

            var passwordHash = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

            db.Users.Add(new User { Username = username, PasswordHash = passwordHash });
            await db.SaveChangesAsync();
            return "User registered";
        }

        public async Task<string> LoginAsync(
            string username,
            string password,
            [Service] IDbContextFactory<AppDbContext> contextFactory,
            [Service] JwtTokenHelper tokenHelper)
        {
            var db = contextFactory.CreateDbContext();
            var passwordHash = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username && u.PasswordHash == passwordHash);
            if (user == null)
                throw new Exception("Invalid credentials.");

            return tokenHelper.GenerateToken(username);
        }

        [Authorize]
        public async Task<string> PlaceOrderAsync(
            string username,
            int phoneId,
            int quantity,
            [Service] IDbContextFactory<AppDbContext> contextFactory)
        {
            var db = contextFactory.CreateDbContext();
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);
            var phone = await db.Phones.FindAsync(phoneId);

            if (user == null || phone == null)
                throw new Exception("Invalid user or phone.");

            db.Orders.Add(new Order
            {
                UserId = user.Id,
                PhoneId = phoneId,
                Quantity = quantity,
                OrderedAt = DateTime.UtcNow
            });

            await db.SaveChangesAsync();
            return "Order placed";
        }
    }

}
