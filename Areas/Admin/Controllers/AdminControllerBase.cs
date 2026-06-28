using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task01.Data;

namespace Task01.Areas.Admin.Controllers;

// Base for all protected admin pages: scopes to the Admin area and
// requires an authenticated user in the "Admin" role.
[Area("Admin")]
[Authorize(Roles = DbSeeder.AdminRole)]
public abstract class AdminControllerBase : Controller
{
}
