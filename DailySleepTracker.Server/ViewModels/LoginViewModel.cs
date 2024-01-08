using System.ComponentModel.DataAnnotations;

namespace DailySleepTracker.Server.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email address not specified!")]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$", ErrorMessage = "Email is invalid.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password not specified!")]
        [MinLength(6)]
        public string? Password { get; set; }
    }
}
