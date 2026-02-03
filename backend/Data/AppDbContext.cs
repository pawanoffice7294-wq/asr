using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<CustomDesign> CustomDesigns { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relations and constraints
        modelBuilder.Entity<CustomDesign>()
            .HasIndex(c => c.DesignId)
            .IsUnique();

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Premium Tee", PriceRange = "₹299 - ₹699", Category = "T-Shirt", ImagePath = "/products/white_tshirt_asr_1769234711724.png" },
            new Product { Id = 2, Name = "Hoodie Pro", PriceRange = "₹899 - ₹1599", Category = "Hoodie", ImagePath = "/products/hoodie_asr_white_1769235205914.png" },
            new Product { Id = 3, Name = "Eco Bag", PriceRange = "₹149 - ₹399", Category = "Bag", ImagePath = "/products/ecobag_asr_white_1769235236150.png" },
            new Product { Id = 4, Name = "Snapback", PriceRange = "₹199 - ₹499", Category = "Hat", ImagePath = "/products/snapback_asr_white_1769235221302.png" },
            new Product { Id = 5, Name = "Classic Cup", PriceRange = "₹199 - ₹499", Category = "Cup", ImagePath = "/products/white_mug_asr_1769234726825.png" },
            new Product { Id = 6, Name = "Travel Mug", PriceRange = "₹249 - ₹599", Category = "Mug", ImagePath = "/products/white_mug_asr_1769234726825.png" },
            new Product { Id = 7, Name = "Soft Pillow", PriceRange = "₹349 - ₹799", Category = "Pillow", ImagePath = "/products/white_pillow_asr_1769234741512.png" }
        );

        modelBuilder.Entity<User>().HasData(
            new User { 
                Id = 1, 
                Name = "Pawan", 
                Email = "pawan", 
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("pawan"),
                CreatedAt = DateTime.UtcNow 
            }
        );
    }
}
