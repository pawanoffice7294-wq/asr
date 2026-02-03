using backend.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Configure PostgreSQL
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Enable CORS for the React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
// Initialize Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
    
    // Manual schema fix for added columns (since EnsureCreated doesn't handle migrations)
    try 
    {
        var conn = context.Database.GetDbConnection();
        conn.Open();
        using var cmd = conn.CreateCommand();
        
        // Add Role to Users if missing - Try both quoted and unquoted for Postgres compatibility
        cmd.CommandText = @"
            DO $$ 
            BEGIN 
                IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Users') THEN
                    ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""Role"" text DEFAULT 'User';
                ELSIF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
                    ALTER TABLE users ADD COLUMN IF NOT EXISTS role text DEFAULT 'User';
                END IF;

                IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Products') THEN
                    ALTER TABLE ""Products"" ADD COLUMN IF NOT EXISTS ""ReelsUrl"" text DEFAULT '';
                ELSIF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'products') THEN
                    ALTER TABLE products ADD COLUMN IF NOT EXISTS reels_url text DEFAULT '';
                END IF;
            END $$;";
        cmd.ExecuteNonQuery();
        
        conn.Close();
    }
    catch (Exception ex)
    {
        Console.WriteLine("Schema update notice: " + ex.Message);
    }
}

app.MapControllers();

app.Run();
