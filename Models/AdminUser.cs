namespace WorkBoard_Pro.Models
{
    public class AdminUser : User
    {
        public AdminUser(string name) : base(name) { }

        public override bool CanCompleteTask(TaskItem task)
        {
            return true;
        }
    }
}
