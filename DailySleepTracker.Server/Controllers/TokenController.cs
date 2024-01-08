using DailySleepTracker.Foundation.Interfaces;
using DailySleepTracker.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DailySleepTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost]
        public async Task<IActionResult> Post(LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid ||
                string.IsNullOrEmpty(loginViewModel.Email) ||
                string.IsNullOrEmpty(loginViewModel.Password))
            {
                return BadRequest(ModelState);
            }

            var identity = await _userService.GetIdentityAsync(loginViewModel.Email, loginViewModel.Password);
            if (identity == null)
            {
                return BadRequest(new { email = "User with such email and password not found!" });
            };

            return new JsonResult(new
            {
                access_token = _userService.GenerateJwtToken(identity),
                username = identity.Name
            });
        }
    }
}
