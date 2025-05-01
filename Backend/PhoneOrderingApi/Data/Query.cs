using Microsoft.EntityFrameworkCore;
using PhoneOrderingApi.Models;

namespace PhoneOrderingApi.Data
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Phone> GetPhones([Service] IDbContextFactory<AppDbContext> contextFactory)
        {
            var context = contextFactory.CreateDbContext();
            return context.Phones;
        }

        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Order> GetOrders([Service] IDbContextFactory<AppDbContext> contextFactory)
        {
            var context = contextFactory.CreateDbContext();
            return context.Orders.Include(o => o.User).Include(o => o.Phone);
        }

        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<User> GetUsers([Service] IDbContextFactory<AppDbContext> contextFactory)
        {
            var context = contextFactory.CreateDbContext();
            return context.Users;
        }
    }
}
