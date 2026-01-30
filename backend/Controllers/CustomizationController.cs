using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Net.Codecrete.QrCodeGenerator;
using System.Text.Json;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomizationController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomizationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<CustomDesign>> SaveDesign([FromBody] CustomDesignRequest request)
    {
        var designId = Guid.NewGuid().ToString("N").Substring(0, 8);
        var qrUrl = $"http://localhost:5173/design/{designId}";
        
        // Generate QR Code
        var qr = QrCode.EncodeText(qrUrl, QrCode.Ecc.Medium);
        var qrSvg = qr.ToSvgString(1);
        
        // Convert to Base64 for easier preview (simplified)
        var qrBase64 = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(qrSvg));

        var design = new CustomDesign
        {
            DesignId = designId,
            BaseProductId = request.BaseProductId,
            ConfigJson = JsonSerializer.Serialize(request.Config),
            QrCodeBase64 = qrBase64,
            CreatedAt = DateTime.UtcNow
        };

        _context.CustomDesigns.Add(design);
        await _context.SaveChangesAsync();

        return Ok(design);
    }

    [HttpGet("{designId}")]
    public async Task<ActionResult<CustomDesign>> GetDesign(string designId)
    {
        var design = await _context.CustomDesigns
            .Include(d => d.BaseProduct)
            .FirstOrDefaultAsync(d => d.DesignId == designId);

        if (design == null) return NotFound();

        return Ok(design);
    }
}

public class CustomDesignRequest
{
    public int BaseProductId { get; set; }
    public object Config { get; set; } = new();
}
