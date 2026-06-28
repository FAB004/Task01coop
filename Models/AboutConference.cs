using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class AboutConference
{
    public int Id { get; set; }

    [Required]
    public string ContentAr { get; set; } = string.Empty;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
