using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class AgendaItem
{
    public int Id { get; set; }

    public int DayNumber { get; set; }

    [Required, MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Time { get; set; }

    public int Order { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
