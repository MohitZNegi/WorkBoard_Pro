namespace WorkBoard_Pro.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; private set; }

        public List<TaskItem> Tasks { get; set; } = new();

        protected User() { }

        public User(string name)
        {
            Name = name;
        }

        public virtual bool CanCompleteTask(TaskItem task)
        {
            return task.UserId == Id;
        }
    }
}
