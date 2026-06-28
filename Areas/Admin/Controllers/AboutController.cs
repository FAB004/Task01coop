using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;
using Task01.Models;

namespace Task01.Areas.Admin.Controllers;

public class AboutController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public AboutController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var about = await _db.AboutConferences.OrderBy(x => x.Id).FirstOrDefaultAsync()
                    ?? new AboutConference();
        return View(about);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(AboutConference model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var about = await _db.AboutConferences.OrderBy(x => x.Id).FirstOrDefaultAsync();
        if (about is null)
        {
            about = new AboutConference();
            _db.AboutConferences.Add(about);
        }

        about.ContentAr = model.ContentAr;
        about.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        TempData["Success"] = "تم حفظ نص (عن المؤتمر).";
        return RedirectToAction(nameof(Index));
    }
}
