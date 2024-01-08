using System.Security.Claims;

namespace DailySleepTracker.Foundation.Interfaces
{
    public interface IUserService
    {
        public Task<bool> IsExistAsync(string email, string password);

        public Task<bool> IsEmailRegisteredAsync(string email);

        public Task CreateUserAsync(string email, string password);

        public Task<ClaimsIdentity?> GetIdentityAsync(string email, string password);

        public string GenerateJwtToken(ClaimsIdentity identity);
    }
}
