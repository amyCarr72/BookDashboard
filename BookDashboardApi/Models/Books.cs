using System.ComponentModel.DataAnnotations;
namespace BookDashboardApi.Models;

public class Book
{   
    [Key]
    public Guid Id { get; set; }
    public required string ISBN { get; set; }
    public required string Author { get; set; }
    public required string Title { get; set; }
    public int Rating { get; set; }
    public string? Comments { get; set; }
    public string? NoteStatus { get; set; }
    public required string CoverImageUrl { get; set; }
}
