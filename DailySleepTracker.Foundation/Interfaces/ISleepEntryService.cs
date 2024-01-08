using DailySleepTracker.Domain.Models;

namespace DailySleepTracker.Foundation.Interfaces
{
    public interface ISleepEntryService
    {
        public Task<SleepEntry?> GetByDateAndUserOrReturnNullAsync(DateTime date, Guid userId);

        public Task AddAsync(SleepEntry sleepEntry);

        public Task UpdateAsync(SleepEntry sleepEntry);

        public Task DeleteAsync(Guid id);
    }
}
