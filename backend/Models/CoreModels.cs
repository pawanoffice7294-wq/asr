using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Product
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public string PriceRange { get; set; } = "₹149 - ₹499";
    
    public string Category { get; set; } = "Apparel";
    
    public string ImagePath { get; set; } = string.Empty;
    
    public string ReelsUrl { get; set; } = string.Empty; // URL to video/reel
}

public class CustomDesign
{
    public int Id { get; set; }
    
    [Required]
    public string DesignId { get; set; } = string.Empty; // Unique string for QR slug
    
    public int? UserId { get; set; }
    public User? User { get; set; }
    
    [Required]
    public int BaseProductId { get; set; }
    public Product? BaseProduct { get; set; }
    
    [Required]
    public string ConfigJson { get; set; } = string.Empty; // Store color, text, etc. as JSON
    
    public string QrCodeBase64 { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
