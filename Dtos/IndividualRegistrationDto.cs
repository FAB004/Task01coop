using System.ComponentModel.DataAnnotations;

namespace Task01.Dtos;

// Field names mirror the React form state in IndividualRegister.jsx
// so the frontend can POST its form object directly.
public class IndividualRegistrationDto
{
    [Required(ErrorMessage = "يرجى إدخال الاسم الكامل")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى إدخال البريد الإلكتروني")]
    [EmailAddress(ErrorMessage = "البريد الإلكتروني غير صحيح")]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى إدخال رقم الجوال")]
    [MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [MaxLength(200)]
    public string? Organization { get; set; }

    [MaxLength(200)]
    public string? JobTitle { get; set; }

    [MaxLength(2000)]
    public string? Reason { get; set; }
}
