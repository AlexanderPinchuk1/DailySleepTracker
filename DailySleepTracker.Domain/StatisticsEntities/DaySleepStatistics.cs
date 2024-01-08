namespace DailySleepTracker.Domain.StatisticsEntities
{
    public class DaySleepStatistics
    {
        public Guid Id { get; set; }

        public double? Hours { get; set; }

        public DateTime Date { get; set; }
    }
}
