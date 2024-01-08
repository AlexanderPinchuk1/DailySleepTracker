using DailySleepTracker.Domain.Models;
using DailySleepTracker.Foundation.Interfaces;
using DailySleepTracker.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DailySleepTracker.Foundation
{
    public class SleepEntryService(DailySleepTrackerDbContext dailySleepTrackerDbContext) : ISleepEntryService
    {
        private readonly DailySleepTrackerDbContext _dailySleepTrackerDbContext = dailySleepTrackerDbContext;



        public async Task AddAsync(SleepEntry sleepEntry)
        {
            _dailySleepTrackerDbContext.SleepEntries.Add(sleepEntry);
            await _dailySleepTrackerDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            await _dailySleepTrackerDbContext.SleepEntries
                .Where(sleepEntry => sleepEntry.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<SleepEntry?> GetByDateAndUserOrReturnNullAsync(DateTime date, Guid userId)
        {
            return await _dailySleepTrackerDbContext.SleepEntries
                .Where(sleepEntry =>
                    sleepEntry.StartTime.Day == date.Day &&
                    sleepEntry.StartTime.Month == date.Month &&
                    sleepEntry.StartTime.Year == date.Year &&
                    sleepEntry.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(SleepEntry sleepEntry)
        {
            _dailySleepTrackerDbContext.SleepEntries.Update(sleepEntry);
            await _dailySleepTrackerDbContext.SaveChangesAsync();
        }
    }
}
