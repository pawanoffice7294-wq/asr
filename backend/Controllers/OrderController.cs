using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> PlaceOrder([FromBody] OrderRequest request)
    {
        var order = new Order
        {
            UserId = request.UserId,
            TotalAmount = request.Items.Sum(i => i.Price * i.Quantity),
            Status = "Pending",
            OrderDate = DateTime.UtcNow
        };

        foreach (var item in request.Items)
        {
            order.Items.Add(new OrderItem
            {
                ProductId = item.ProductId,
                CustomDesignId = item.CustomDesignId,
                Quantity = item.Quantity,
                Price = item.Price
            });
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(order);
    }
}

public class OrderRequest
{
    public int? UserId { get; set; }
    public List<OrderItemRequest> Items { get; set; } = new();
}

public class OrderItemRequest
{
    public int ProductId { get; set; }
    public int? CustomDesignId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
