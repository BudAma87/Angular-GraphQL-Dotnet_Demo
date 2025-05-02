using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PhoneOrderingApi.Data;
using PhoneOrderingApi.Helpers;
using PhoneOrderingApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddAuthorization(); 


builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!))
        };
    });
builder.Services.AddSingleton<JwtTokenHelper>();
builder.Services.AddPooledDbContextFactory<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});


builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<IDbContextFactory<AppDbContext>>().CreateDbContext();

    if (!db.Phones.Any())
    {
        db.Phones.Add(new Phone { Name = "iPhone 12", Price = 1500 });
        db.Phones.Add(new Phone { Name = "iPhone 13", Price = 2500 });
        db.Phones.Add(new Phone { Name = "iPhone 14", Price = 3500 });
        db.Phones.Add(new Phone { Name = "iPhone 15", Price = 4500 });
        db.Phones.Add(new Phone { Name = "iPhone 16", Price = 5500 });
        db.Phones.Add(new Phone { Name = "Galaxy S23", Price = 3500 });
        db.Phones.Add(new Phone { Name = "Galaxy S24", Price = 4500 });
        db.SaveChanges();
    }
}
app.UseCors("AllowFrontend");
// Enable GraphQL endpoint
app.MapGraphQL();

app.Run();

