namespace PhoneOrderingApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
