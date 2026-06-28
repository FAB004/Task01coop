using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class IndividualRegistration
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string FullName { get; set; } = string.Empty;

    [Required, MaxLength(200), EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [MaxLength(200)]
    public string? Organization { get; set; }

    [MaxLength(200)]
    public string? JobTitle { get; set; }

    [MaxLength(2000)]
    public string? AttendanceReason { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
