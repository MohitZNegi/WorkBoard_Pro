// Throws UnauthorizedAccessException (not generic Exception) so controller
//      can return 403 Forbidden instead of 500 Internal Server Error.
//      This is also the correct .NET exception type for authorization failures
using WorkBoard_Pro.Data;
namespace WorkBoard_Pro.Services
{
    public class TaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task CompleteTask(int taskId, int userId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        var user = await _context.Users.FindAsync(userId);

        if (task == null || user == null)
            throw new Exception("Task or User not found.");

        // Polymorphism: if user is AdminUser, override runs — no if-else needed
        if (!user.CanCompleteTask(task))
            throw new UnauthorizedAccessException(
                "Regular users can only complete their own tasks."
            );

        task.MarkCompleted();
        await _context.SaveChangesAsync();
    }
}
    }