using DailySleepTracker.Domain.StatisticsEntities;

namespace DailySleepTracker.Foundation.Interfaces
{
    public interface IStatisticsService
    {
        public Task<DaySleepStatistics> GetDayStatisticsByDateAsync(DateTime date, Guid userId);

        public Task<List<DaySleepStatistics>> GetWeekStatisticsByDateAsync(DateTime date, Guid userId);
       
        public Task<List<DaySleepStatistics>> GetMonthStatisticsByDateAsync(DateTime date, Guid userId);
        
        public Task<List<MonthSleepStatistics>> GetYearStatisticsByDateAsync(DateTime date, Guid userId);

        public Task<FullStatistics> GetFullStatisticsByDateAsync(DateTime date, Guid userId);
    }
}
