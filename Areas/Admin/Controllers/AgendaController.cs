using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;
using Task01.Models;

namespace Task01.Areas.Admin.Controllers;

public class AgendaController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public AgendaController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var items = await _db.AgendaItems
            .OrderBy(x => x.DayNumber).ThenBy(x => x.Order)
            .ToListAsync();
        return View(items);
    }

    public IActionResult Create() => View(new AgendaItem { DayNumber = 1 });

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AgendaItem model)
    {
        if (!ModelState.IsValid) return View(model);

        model.CreatedAt = DateTime.UtcNow;
        model.UpdatedAt = DateTime.UtcNow;
        _db.AgendaItems.Add(model);
        await _db.SaveChangesAsync();
        TempData["Success"] = "تمت إضافة البند.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var item = await _db.AgendaItems.FindAsync(id);
        if (item is null) return NotFound();
        return View(item);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(AgendaItem model)
    {
        if (!ModelState.IsValid) return View(model);

        var item = await _db.AgendaItems.FindAsync(model.Id);
        if (item is null) return NotFound();

        item.DayNumber = model.DayNumber;
        item.Title = model.Title;
        item.Time = model.Time;
        item.Order = model.Order;
        item.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        TempData["Success"] = "تم حفظ التعديل.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.AgendaItems.FindAsync(id);
        if (item is not null)
        {
            _db.AgendaItems.Remove(item);
            await _db.SaveChangesAsync();
            TempData["Success"] = "تم حذف البند.";
        }
        return RedirectToAction(nameof(Index));
    }
}
