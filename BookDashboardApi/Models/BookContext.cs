using Microsoft.EntityFrameworkCore;

namespace BookDashboardApi.Models;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Book { get; set; } = null!;
}