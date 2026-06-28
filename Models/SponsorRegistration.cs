using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class SponsorRegistration
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string ContactPerson { get; set; } = string.Empty;

    [Required, MaxLength(200), EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? SponsorshipType { get; set; }

    [MaxLength(2000)]
    public string? Message { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
