using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;
using Task01.Models;

namespace Task01.Areas.Admin.Controllers;

public class SettingsController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public SettingsController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var settings = await _db.ConferenceSettings.OrderBy(x => x.Id).FirstOrDefaultAsync()
                       ?? new ConferenceSettings();
        return View(settings);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(ConferenceSettings model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var settings = await _db.ConferenceSettings.OrderBy(x => x.Id).FirstOrDefaultAsync();
        if (settings is null)
        {
            settings = new ConferenceSettings();
            _db.ConferenceSettings.Add(settings);
        }

        settings.ConferenceStartDate = model.ConferenceStartDate;
        settings.ConferenceStartTime = model.ConferenceStartTime;
        settings.ConferenceEndDate = model.ConferenceEndDate;
        settings.ConferenceEndTime = model.ConferenceEndTime;
        settings.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        TempData["Success"] = "تم حفظ وقت المؤتمر.";
        return RedirectToAction(nameof(Index));
    }
}
