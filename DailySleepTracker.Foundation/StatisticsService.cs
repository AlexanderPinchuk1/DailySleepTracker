using DailySleepTracker.Domain.Models;
using DailySleepTracker.Domain.StatisticsEntities;
using DailySleepTracker.Foundation.Interfaces;
using DailySleepTracker.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DailySleepTracker.Foundation
{
    public class StatisticsService(DailySleepTrackerDbContext dailySleepTrackerDbContext) : IStatisticsService
    {
        private const int DAY_COUNT_IN_WEEK = 7;
        private const int MONTH_COUNT_IN_YEAR = 12;
        private readonly DailySleepTrackerDbContext _dailySleepTrackerDbContext = dailySleepTrackerDbContext;



        public async Task<DaySleepStatistics> GetDayStatisticsByDateAsync(DateTime date, Guid userId)
        {
            var sleepEntry = await _dailySleepTrackerDbContext.SleepEntries
                .Where(sleepEntry =>
                    sleepEntry.StartTime.Day == date.Day &&
                    sleepEntry.StartTime.Month == date.Month &&
                    sleepEntry.StartTime.Year == date.Year &&
                    sleepEntry.UserId == userId)
                .FirstOrDefaultAsync();

            return new DaySleepStatistics()
            {
                Id = sleepEntry == null ? Guid.NewGuid() : sleepEntry.Id,
                Date = date,
                Hours = sleepEntry == null ? null : CalculateSleepHours(sleepEntry)
            };
        }

        public async Task<List<DaySleepStatistics>> GetWeekStatisticsByDateAsync(DateTime date, Guid userId)
        {
            var sleepEntries = await _dailySleepTrackerDbContext.SleepEntries
                .Where(sleepEntry =>
                    sleepEntry.StartTime.Month == date.Month &&
                    sleepEntry.StartTime.Year == date.Year &&
                    sleepEntry.UserId == userId)
                .ToListAsync();

            var firstDayInWeek = GetFirstDayInWeek(date);
            var weekStatistics = new List<DaySleepStatistics>();
            for (var i = 0; i < DAY_COUNT_IN_WEEK; i++)
            {
                var currentDayofWeekDate = firstDayInWeek.AddDays(i);
                var existStatistics = sleepEntries
                    .Where(sleepEntry => sleepEntry.StartTime.Day == currentDayofWeekDate.Day &&
                        sleepEntry.StartTime.Month == currentDayofWeekDate.Month)
                    .FirstOrDefault();

                weekStatistics.Add(new DaySleepStatistics()
                {
                    Id = existStatistics == null ? Guid.NewGuid() : existStatistics.Id,
                    Date = currentDayofWeekDate,
                    Hours = existStatistics == null ? null : CalculateSleepHours(existStatistics)
                });
            }

            return weekStatistics;
        }

        public async Task<List<DaySleepStatistics>> GetMonthStatisticsByDateAsync(DateTime date, Guid userId)
        {
            var sleepEntries = await _dailySleepTrackerDbContext.SleepEntries
             .Where(sleepEntry =>
                 sleepEntry.StartTime.Month == date.Month &&
                 sleepEntry.StartTime.Year == date.Year &&
                 sleepEntry.UserId == userId)
             .ToListAsync();

            var firstDayInMonth = new DateTime(date.Year, date.Month, 1);
            var monthStatistics = new List<DaySleepStatistics>();
            for (var i = 0; i < DateTime.DaysInMonth(date.Year, date.Month); i++)
            {
                var currentDayofMonthDate = firstDayInMonth.AddDays(i);
                var existStatistics = sleepEntries
                    .Where(sleepEntry => sleepEntry.StartTime.Day == currentDayofMonthDate.Day)
                    .FirstOrDefault();

                monthStatistics.Add(new DaySleepStatistics()
                {
                    Id = existStatistics == null ? Guid.NewGuid() : existStatistics.Id,
                    Date = currentDayofMonthDate,
                    Hours = existStatistics == null ? null : CalculateSleepHours(existStatistics)
                });
            }

            return monthStatistics;
        }

        public async Task<List<MonthSleepStatistics>> GetYearStatisticsByDateAsync(DateTime date, Guid userId)
        {
            var sleepEntries = await _dailySleepTrackerDbContext.SleepEntries
               .Where(sleepEntry =>
                   sleepEntry.StartTime.Year == date.Year &&
                   sleepEntry.UserId == userId)
               .ToListAsync();

            var yearStatistics = new List<MonthSleepStatistics>();
            for (var i = 0; i < MONTH_COUNT_IN_YEAR; i++)
            {
                var averageSleepTimeInMonth = 0.0; 
                var monthSleepEntries = sleepEntries
                    .Where(sleepEntry => 
                        sleepEntry.StartTime.Month - 1 == i)
                    .ToList();

                if(monthSleepEntries.Count != 0)
                {
                    averageSleepTimeInMonth = Math.Round(monthSleepEntries.Average(CalculateSleepHours),2);
                }

                yearStatistics.Add(new MonthSleepStatistics()
                {
                    MonthNumber = i,
                    AverageSleepTime = monthSleepEntries.Count != 0 ? averageSleepTimeInMonth : null,
                    Year = date.Year,
                }); 
            }

            return yearStatistics;
        }

        public async Task<FullStatistics> GetFullStatisticsByDateAsync(DateTime date, Guid userId)
        {
            return new FullStatistics()
            {
                Day = await GetDayStatisticsByDateAsync(date, userId),
                Week = await GetWeekStatisticsByDateAsync(date, userId),
                Month = await GetMonthStatisticsByDateAsync(date, userId),
                Year = await GetYearStatisticsByDateAsync(date, userId)
            };
        }

        private static double CalculateSleepHours(SleepEntry sleepEntry)
        {
            var difference = sleepEntry.FinishTime - sleepEntry.StartTime;

            return Math.Round(difference.TotalHours, 2);
        }

        private static DateTime GetFirstDayInWeek(DateTime date)
        {
            var difference = date.DayOfWeek - DayOfWeek.Monday;
            if (difference < 0)
            {
                difference += DAY_COUNT_IN_WEEK;
            }

            return date.AddDays(difference * (-1)).Date;
        }
    }
}
