using DailySleepTracker.Domain.Attributes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DailySleepTracker.Domain.Models
{
    public class SleepEntry
    {
        [RequireNonDefault(ErrorMessage = "is required!")]
        public Guid Id { get; set; }

        [RequireNonDefault(ErrorMessage = "is required!")]
        public DateTime StartTime { get; set; }

        [RequireNonDefault(ErrorMessage = "is required!")]
        public DateTime FinishTime { get; set; }

        public Guid UserId { get; set; }

        public User? User { get; set; }
    }



    public class SleepEntryConfig : IEntityTypeConfiguration<SleepEntry>
    {
        public void Configure(EntityTypeBuilder<SleepEntry> builder)
        {
            builder.HasKey(sleepEntry => sleepEntry.Id);
            builder.Property(sleepEntry => sleepEntry.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(sleepEntry => sleepEntry.User).WithMany();
            builder.ToTable(name: "SleepEntry");
        }
    }
}
