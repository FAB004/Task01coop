using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class Speaker
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? Title { get; set; }

    [MaxLength(500)]
    public string? ImagePath { get; set; }

    public int Order { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
