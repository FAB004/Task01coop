using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;
using Task01.Models;

namespace Task01.Areas.Admin.Controllers;

public class SpeakersController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IWebHostEnvironment _env;

    // الامتدادات المسموحة + الحد الأقصى لحجم الصورة (5 ميجابايت).
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    private const long MaxImageBytes = 5 * 1024 * 1024;
    private const string UploadsRelative = "/uploads/speakers/";

    public SpeakersController(ApplicationDbContext db, IWebHostEnvironment env)
    {
        _db = db;
        _env = env;
    }

    public async Task<IActionResult> Index()
    {
        var items = await _db.Speakers.OrderBy(x => x.Order).ToListAsync();
        return View(items);
    }

    public IActionResult Create() => View(new Speaker());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Speaker model, IFormFile? imageFile)
    {
        var newPath = await TrySaveImageAsync(imageFile);
        if (!ModelState.IsValid) return View(model);

        if (newPath is not null) model.ImagePath = newPath;
        model.CreatedAt = DateTime.UtcNow;
        model.UpdatedAt = DateTime.UtcNow;
        _db.Speakers.Add(model);
        await _db.SaveChangesAsync();
        TempData["Success"] = "تمت إضافة المتحدث.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var item = await _db.Speakers.FindAsync(id);
        if (item is null) return NotFound();
        return View(item);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(Speaker model, IFormFile? imageFile)
    {
        var item = await _db.Speakers.FindAsync(model.Id);
        if (item is null) return NotFound();

        var newPath = await TrySaveImageAsync(imageFile);
        if (!ModelState.IsValid) return View(model);

        item.Name = model.Name;
        item.Title = model.Title;
        item.Order = model.Order;
        if (newPath is not null)
        {
            // استبدال الصورة: احذف الملف القديم إن كان من رفعنا.
            DeleteLocalImage(item.ImagePath);
            item.ImagePath = newPath;
        }
        item.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        TempData["Success"] = "تم حفظ التعديل.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Speakers.FindAsync(id);
        if (item is not null)
        {
            DeleteLocalImage(item.ImagePath);
            _db.Speakers.Remove(item);
            await _db.SaveChangesAsync();
            TempData["Success"] = "تم حذف المتحدث.";
        }
        return RedirectToAction(nameof(Index));
    }

    // يتحقّق من الصورة المرفوعة ويحفظها داخل wwwroot/uploads/speakers/.
    // يعيد المسار العام (/uploads/speakers/xxx.ext) عند النجاح، أو null إن لم تُرفع صورة.
    // عند وجود خطأ يضيف رسالة عربية إلى ModelState ويعيد null.
    private async Task<string?> TrySaveImageAsync(IFormFile? file)
    {
        if (file is null || file.Length == 0) return null;

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
        {
            ModelState.AddModelError("imageFile", "نوع الملف غير مدعوم. الصيغ المسموحة: jpg، jpeg، png، webp.");
            return null;
        }
        if (file.Length > MaxImageBytes)
        {
            ModelState.AddModelError("imageFile", "حجم الصورة كبير جداً. الحد الأقصى المسموح 5 ميجابايت.");
            return null;
        }

        var uploadsDir = Path.Combine(_env.WebRootPath, "uploads", "speakers");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(uploadsDir, fileName);
        await using (var stream = System.IO.File.Create(fullPath))
        {
            await file.CopyToAsync(stream);
        }

        return $"{UploadsRelative}{fileName}";
    }

    // يحذف ملف صورة قديم بأمان: فقط الملفات التي رفعناها تحت /uploads/speakers/.
    private void DeleteLocalImage(string? publicPath)
    {
        if (string.IsNullOrWhiteSpace(publicPath)) return;
        if (!publicPath.StartsWith(UploadsRelative, StringComparison.OrdinalIgnoreCase)) return;

        var relative = publicPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
        var fullPath = Path.Combine(_env.WebRootPath, relative);
        try
        {
            if (System.IO.File.Exists(fullPath)) System.IO.File.Delete(fullPath);
        }
        catch
        {
            /* تجاهل أخطاء الحذف حتى لا تُفشل عملية الحفظ */
        }
    }
}
