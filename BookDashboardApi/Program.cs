using Microsoft.EntityFrameworkCore;
using BookDashboardApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BookContext>(opt =>
    opt.UseInMemoryDatabase("BookList"));

// Add services to the container.

// Add CORS services
builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecificOrigin", policy => {
        policy.WithOrigins("http://localhost:8080") // Replace with your domain
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
