using Microsoft.EntityFrameworkCore;
using PhoneOrderingApi.Models;

namespace PhoneOrderingApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Phone> Phones => Set<Phone>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Optional: Fluent API configuration (can be used later if needed)
    }
}
