using DailySleepTracker.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DailySleepTracker.Repositories
{
    public class DailySleepTrackerDbContext : DbContext
    {
        public DbSet<SleepEntry> SleepEntries { get; set; }
        public DbSet<User> Users { get; set; }



        public DailySleepTrackerDbContext(DbContextOptions<DailySleepTrackerDbContext> options) 
            : base(options)
        {
            Database.Migrate();
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(assembly: typeof(SleepEntry).Assembly);
        }
    }    
}
