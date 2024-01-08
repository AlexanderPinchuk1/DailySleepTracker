using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DailySleepTracker.Domain
{
    public class AuthOptions
    {
        public const string ISSUER = "AuthServer"; 
        public const string AUDIENCE = "AuthClient"; 
        const string KEY = "dailysleeptrackerapplication_secretkey!";
        public const int LIFETIME = 360;
        


        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
