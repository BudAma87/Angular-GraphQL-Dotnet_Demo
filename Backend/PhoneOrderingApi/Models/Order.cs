namespace PhoneOrderingApi.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = default!;

        public int PhoneId { get; set; }
        public Phone Phone { get; set; } = default!;

        public int Quantity { get; set; }
        public DateTime OrderedAt { get; set; } = DateTime.UtcNow;
    }
}
