using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Task01.Data;

var builder = WebApplication.CreateBuilder(args);

// MVC (admin views) + API controllers.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ASP.NET Core Identity with roles. Passwords are hashed by Identity.
builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.Password.RequiredLength = 6;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Point the auth cookie at the admin login/access-denied pages.
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Admin/Account/Login";
    options.LogoutPath = "/Admin/Account/Logout";
    options.AccessDeniedPath = "/Admin/Account/Login";
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = true;
});

var app = builder.Build();

// Apply migrations and seed admin user + default content on startup.
await DbSeeder.SeedAsync(app.Services, app.Configuration);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// يقدّم الملفات المرفوعة وقت التشغيل من wwwroot (مثل /uploads/speakers/*).
// MapStaticAssets يخدم فقط أصول وقت البناء، لذا نحتاج UseStaticFiles للملفات الجديدة.
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

// Attribute-routed API controllers (/api/...).
app.MapControllers();

// Admin area (conventional routing): /Admin/{controller}/{action}.
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

// SPA fallback: serve the React shell for client-side routes
// (e.g. /sponsor-register) so deep-links and refresh don't 404.
app.MapFallbackToController("Index", "Home");

app.Run();
