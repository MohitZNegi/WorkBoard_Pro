using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkBoard_Pro.Models;
using WorkBoard_Pro.Services;
using WorkBoard_Pro.Data;

namespace WorkBoard_Pro.Controllers  
{
    [ApiController]
[Route("api/[controller]")]
public class TasksController : Controller
{
    private readonly AppDbContext _context;
    private readonly TaskService _service;

    public TasksController(AppDbContext context, TaskService service)
    {
        _context = context;
        _service = service;
    }

    // GET /api/tasks
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var tasks = await _context.Tasks
            .Include(t => t.User)   // include user so frontend knows who owns it
            .ToListAsync();
        return Ok(tasks);
    }

    // POST /api/tasks
    // FIX: Was [FromBody] string title — could not accept userId at all.
    // Now accepts a DTO with both Title and UserId.
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Title is required.");

        var user = await _context.Users.FindAsync(dto.UserId);
        if (user == null)
            return BadRequest($"User with id {dto.UserId} not found.");

        var task = new TaskItem(dto.Title)
        {
            UserId = dto.UserId
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return Ok(task);
    }

    // PUT /api/tasks/{id}/complete?userId=1
    // FIX: Now returns 403 instead of 500 when OOP rule blocks completion
    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete(int id, [FromQuery] int userId)
    {
        try
        {
            await _service.CompleteTask(id, userId);
            return Ok();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE /api/tasks/{id}
    // FIX: This endpoint was missing entirely — frontend was calling it and getting 404
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return Ok();
    }
}

public class CreateTaskDto
{
    public string Title { get; set; }
    public int UserId { get; set; }
}
    }