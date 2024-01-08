using Microsoft.AspNetCore.Mvc;
using DailySleepTracker.Foundation.Interfaces;
using DailySleepTracker.Server.ViewModels;

namespace DailySleepTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost]
        public async Task<IActionResult> Post(RegisterViewModel registerViewModel)
        {
            if (!ModelState.IsValid ||
                string.IsNullOrEmpty(registerViewModel.Email) ||
                string.IsNullOrEmpty(registerViewModel.Password))
            {
                return BadRequest(ModelState);
            }

            if (await _userService.IsEmailRegisteredAsync(registerViewModel.Email))
            {
                return BadRequest(new { email = "Email is already taken." }); ;
            }

            await _userService.CreateUserAsync(
                registerViewModel.Email,
                registerViewModel.Password);

            return Ok();
        }
    }
}
