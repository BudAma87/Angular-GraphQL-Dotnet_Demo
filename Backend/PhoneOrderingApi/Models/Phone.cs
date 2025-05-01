namespace PhoneOrderingApi.Models
{
    public class Phone
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
