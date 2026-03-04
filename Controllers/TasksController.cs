using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkBoard_Pro.Data;
using WorkBoard_Pro.Models;
using WorkBoard_Pro.Services;

namespace WorkBoard_Pro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TaskService _service;

        public TasksController(AppDbContext context, TaskService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string title)
        {
            var task = new TaskItem(title);
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(task);
        }

        [HttpPut("{id}/complete")]
        public async Task<IActionResult> Complete(int id, [FromQuery] int userId)
        {
            await _service.CompleteTask(id, userId);
            return Ok();
        }
    }
}
