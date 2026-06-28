using System.ComponentModel.DataAnnotations;

namespace Task01.Dtos;

// Field names mirror the React form state in SponsorRegister.jsx.
public class SponsorRegistrationDto
{
    [Required(ErrorMessage = "يرجى إدخال اسم الشركة")]
    [MaxLength(200)]
    public string Company { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى إدخال اسم مسؤول التواصل")]
    [MaxLength(200)]
    public string Contact { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى إدخال البريد الإلكتروني")]
    [EmailAddress(ErrorMessage = "البريد الإلكتروني غير صحيح")]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى إدخال رقم الجوال")]
    [MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Type { get; set; }

    [MaxLength(2000)]
    public string? Message { get; set; }
}
