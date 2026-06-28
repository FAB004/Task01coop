using Microsoft.AspNetCore.Mvc;
using Task01.Data;
using Task01.Dtos;
using Task01.Models;

namespace Task01.Controllers.Api;

// Public endpoints the React forms post to. No authentication required.
[ApiController]
[Route("api/registrations")]
public class RegistrationsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public RegistrationsController(ApplicationDbContext db) => _db = db;

    // POST /api/registrations/individual
    [HttpPost("individual")]
    public async Task<IActionResult> Individual([FromBody] IndividualRegistrationDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var entity = new IndividualRegistration
        {
            FullName = dto.Name.Trim(),
            Email = dto.Email.Trim(),
            Phone = dto.Phone.Trim(),
            Nationality = dto.Nationality?.Trim(),
            Organization = dto.Organization?.Trim(),
            JobTitle = dto.JobTitle?.Trim(),
            AttendanceReason = dto.Reason?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _db.IndividualRegistrations.Add(entity);
        await _db.SaveChangesAsync();

        return Ok(new { success = true, id = entity.Id });
    }

    // POST /api/registrations/sponsor
    [HttpPost("sponsor")]
    public async Task<IActionResult> Sponsor([FromBody] SponsorRegistrationDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var entity = new SponsorRegistration
        {
            CompanyName = dto.Company.Trim(),
            ContactPerson = dto.Contact.Trim(),
            Email = dto.Email.Trim(),
            Phone = dto.Phone.Trim(),
            SponsorshipType = dto.Type?.Trim(),
            Message = dto.Message?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _db.SponsorRegistrations.Add(entity);
        await _db.SaveChangesAsync();

        return Ok(new { success = true, id = entity.Id });
    }
}
