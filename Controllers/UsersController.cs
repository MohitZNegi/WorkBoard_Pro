using Microsoft.AspNetCore.Mvc;
using WorkBoard_Pro.Models;
using Microsoft.EntityFrameworkCore;
using WorkBoard_Pro.Data;
namespace WorkBoard_Pro.Controllers  
{
    // Also has a /seed endpoint so you can populate test users without touching the DB manually.
    [ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/users
    // Returns all users — used by React dropdown
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    // POST /api/users/seed
    // Inserts demo users if the table is empty — run this once after migrations
    // Call it from Swagger or: fetch('/api/users/seed', { method: 'POST' })
    [HttpPost("seed")]
    public async Task<IActionResult> Seed()
    {
        if (await _context.Users.AnyAsync())
            return Ok("Already seeded.");

        // AdminUser can complete ANY task
        _context.Users.Add(new AdminUser("Alice (Admin)"));

        // Regular users can only complete their OWN tasks
        _context.Users.Add(new User("Bob (Regular)"));
        _context.Users.Add(new User("Carol (Regular)"));

        await _context.SaveChangesAsync();
        return Ok("Seeded 3 users: Alice (Admin), Bob, Carol.");
    }
}
    }