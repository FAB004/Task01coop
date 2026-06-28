using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;

namespace Task01.Areas.Admin.Controllers;

public class DashboardController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public DashboardController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        ViewBag.IndividualCount = await _db.IndividualRegistrations.CountAsync();
        ViewBag.SponsorCount = await _db.SponsorRegistrations.CountAsync();
        ViewBag.SpeakerCount = await _db.Speakers.CountAsync();
        ViewBag.AgendaCount = await _db.AgendaItems.CountAsync();
        return View();
    }
}
