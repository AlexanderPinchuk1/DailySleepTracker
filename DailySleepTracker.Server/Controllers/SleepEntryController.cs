using DailySleepTracker.Domain.Models;
using DailySleepTracker.Foundation.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailySleepTracker.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SleepEntryController(ISleepEntryService sleepEntryService) : ControllerBase
    {
        private readonly ISleepEntryService _sleepEntryService = sleepEntryService;



        [HttpGet]
        public async Task<IActionResult> Get(DateTime date)
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

            var res = await _sleepEntryService.GetByDateAndUserOrReturnNullAsync(date, userId);

            return new JsonResult(res); ;
        }

        [HttpPost]
        public async Task<IActionResult> Post(SleepEntry sleepEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            sleepEntry.UserId = userId;

            try
            {
                await _sleepEntryService.AddAsync(sleepEntry);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(SleepEntry sleepEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            sleepEntry.UserId = userId;

            try
            {
                await _sleepEntryService.UpdateAsync(sleepEntry);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var isUserIdExist = Guid.TryParse(User?.Identity?.Name, out Guid userId);
            if (isUserIdExist == false || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            try
            {
                await _sleepEntryService.DeleteAsync(id);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
