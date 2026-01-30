using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Order
{
    public int Id { get; set; }
    
    public int? UserId { get; set; }
    public User? User { get; set; }
    
    [Required]
    public decimal TotalAmount { get; set; }
    
    public string Status { get; set; } = "Pending"; // Pending, Paid, Shipped, Delivered
    
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    
    public int OrderId { get; set; }
    
    [Required]
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    
    public int? CustomDesignId { get; set; } // Null if it's a standard product
    public CustomDesign? CustomDesign { get; set; }
    
    [Required]
    public int Quantity { get; set; }
    
    [Required]
    public decimal Price { get; set; } // Captured price at time of order
}
