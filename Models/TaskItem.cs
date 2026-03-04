namespace WorkBoard_Pro.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; private set; }

        public bool IsCompleted { get; private set; }

        public int UserId { get; set; }

        public User User { get; set; }

        protected TaskItem() { }

        public TaskItem(string title)
        {
            Title = title;
        }

        public void MarkCompleted()
        {
            IsCompleted = true;
        }
    }
}
