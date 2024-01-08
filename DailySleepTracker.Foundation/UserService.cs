using DailySleepTracker.Domain;
using DailySleepTracker.Domain.Models;
using DailySleepTracker.Foundation.Interfaces;
using DailySleepTracker.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DailySleepTracker.Foundation
{
    public class UserService(DailySleepTrackerDbContext dailySleepTrackerDbContext) : IUserService
    {
        private const string SALT = "Salt";

        private readonly DailySleepTrackerDbContext _dailySleepTrackerDbContext = dailySleepTrackerDbContext;



        public async Task<bool> IsExistAsync(string email, string password)
        {
            return await _dailySleepTrackerDbContext.Users
                .AnyAsync(user => 
                    user.Email == email && 
                    user.PasswordHash == HashString(password, SALT));
        }

        public async Task<bool> IsEmailRegisteredAsync(string email)
        {
            return await _dailySleepTrackerDbContext.Users
                .AnyAsync(user => user.Email == email);
        }

        public async Task CreateUserAsync(string email, string password)
        {
            if(await IsExistAsync(email, password)) 
            {
                return;
            }

            _dailySleepTrackerDbContext.Users
                .Add(new User()
                {
                    Id = Guid.NewGuid(),
                    Email = email,
                    PasswordHash = HashString(password, SALT)
                });

            await _dailySleepTrackerDbContext.SaveChangesAsync();
        }

        public async Task<ClaimsIdentity?> GetIdentityAsync(string email, string password)
        {
            var user = await GetUserOrReturnNullAsync(email, password);
            if (user == null)
            {
                return null;
            }

            return new ClaimsIdentity(new List<Claim>
            {
                new(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString())
            }, "Token"); ; 
        }

        public string GenerateJwtToken(ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
            notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            
            return encodedJwt;
        }

        private async Task<User?> GetUserOrReturnNullAsync(string email, string password)
        {
            return await _dailySleepTrackerDbContext.Users
                .Where(user =>
                    user.Email == email &&
                    user.PasswordHash == HashString(password, SALT))
                .FirstOrDefaultAsync();
        }

        private static string HashString(string text, string salt)
        {
            if (String.IsNullOrEmpty(text))
            {
                return String.Empty;
            }

            byte[] textBytes = System.Text.Encoding.UTF8.GetBytes(text + salt);
            byte[] hashBytes = System.Security.Cryptography.SHA256.HashData(textBytes);

            string hash = BitConverter
                .ToString(hashBytes)
                .Replace("-", String.Empty);

            return hash;
        }
    }
}
