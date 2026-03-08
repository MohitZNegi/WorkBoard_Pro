using Microsoft.EntityFrameworkCore;
using WorkBoard_Pro.Models;


//      EF Core needs to know AdminUser is a subtype of User.
//      Without this, seeded AdminUser objects are saved as plain Users,
//      and the polymorphism (CanCompleteTask override) never fires at runtime.
//      Using Table-Per-Hierarchy (TPH) — one Users table with a Discriminator column.
namespace WorkBoard_Pro.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // TPH: EF Core adds a "Discriminator" column to the Users table.
            // When you load a user, EF Core returns AdminUser or User based on that column.
            // This is what makes polymorphism work with the database.
            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("UserType")
                .HasValue<User>("Regular")
                .HasValue<AdminUser>("Admin");
        }
    }
}