namespace DailySleepTracker.Domain.StatisticsEntities
{
    public class FullStatistics
    {
        public DaySleepStatistics? Day { get; set; }

        public List<DaySleepStatistics>? Week { get; set; }

        public List<DaySleepStatistics>? Month { get; set; }

        public List<MonthSleepStatistics>? Year { get; set; }
    }
}
