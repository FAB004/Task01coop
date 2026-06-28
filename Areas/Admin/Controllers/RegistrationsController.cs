using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;

namespace Task01.Areas.Admin.Controllers;

public class RegistrationsController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public RegistrationsController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Individuals()
    {
        var items = await _db.IndividualRegistrations
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return View(items);
    }

    public async Task<IActionResult> Sponsors()
    {
        var items = await _db.SponsorRegistrations
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return View(items);
    }
}
