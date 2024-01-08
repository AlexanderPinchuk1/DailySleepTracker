using DailySleepTracker.Foundation.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DailySleepTracker.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    public class StatisticsController(IStatisticsService statisticsService) : Controller
    {
        private readonly IStatisticsService _statisticsService = statisticsService;



        [HttpGet]
        public async Task<IActionResult> Full(DateTime date)
        {
            if (date == DateTime.MinValue)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            return new JsonResult(await _statisticsService.GetFullStatisticsByDateAsync(date, userId));
        }

        [HttpGet]
        public async Task<IActionResult> Day(DateTime date)
        {
            if (date == DateTime.MinValue)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            return new JsonResult(await _statisticsService.GetDayStatisticsByDateAsync(date, userId));
        }

        [HttpGet]
        public async Task<IActionResult> Week(DateTime date)
        {
            if (date == DateTime.MinValue)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            return new JsonResult(await _statisticsService.GetWeekStatisticsByDateAsync(date, userId));
        }

        [HttpGet]
        public async Task<IActionResult> Month(DateTime date)
        {
            if (date == DateTime.MinValue)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            return new JsonResult(await _statisticsService.GetMonthStatisticsByDateAsync(date, userId));
        }

        [HttpGet]
        public async Task<IActionResult> Year(DateTime date)
        {
            if (date == DateTime.MinValue)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            return new JsonResult(await _statisticsService.GetYearStatisticsByDateAsync(date, userId));
        }
    }
}
