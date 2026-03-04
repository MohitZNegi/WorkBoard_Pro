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
                throw new Exception("Not found");

            if (!user.CanCompleteTask(task))
                throw new Exception("Not authorized");

            task.MarkCompleted();
            await _context.SaveChangesAsync();
        }
    }
}
