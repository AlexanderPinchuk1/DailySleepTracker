using System.ComponentModel.DataAnnotations;

namespace DailySleepTracker.Server.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Email address not specified!")]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$", ErrorMessage = "Email is invalid.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password not specified!")]
        [MinLength(6)]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Confirm password not specified!")]
        [MinLength(6)]
        [Compare("Password", ErrorMessage = "Confirm password not match password!")]
        public string? ConfirmPassword { get; set; }
    }
}
