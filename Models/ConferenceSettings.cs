using System.ComponentModel.DataAnnotations;

namespace Task01.Models;

public class ConferenceSettings
{
    public int Id { get; set; }

    // Stored as strings to mirror the React store ("2026-02-04" / "07:00")
    // and stay timezone-agnostic for simple display/countdown use.
    [Required, MaxLength(10)]
    public string ConferenceStartDate { get; set; } = string.Empty;

    [Required, MaxLength(5)]
    public string ConferenceStartTime { get; set; } = string.Empty;

    [Required, MaxLength(10)]
    public string ConferenceEndDate { get; set; } = string.Empty;

    [Required, MaxLength(5)]
    public string ConferenceEndTime { get; set; } = string.Empty;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
