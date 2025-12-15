using LibraryManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryRepository _libraryRepo;

        public LibraryController(ILibraryRepository libraryRepo)
        {
            _libraryRepo = libraryRepo;
        }

        [HttpPost("issue")]
        public async Task<IActionResult> IssueBook([FromBody] IssueRequest request)
        {
            var success = await _libraryRepo.IssueBook(request.UserId, request.BookId);
            if (success) return Ok(new { message = "Book issued successfully" });
            return BadRequest(new { message = "Book not available or user limit reached" });
        }

        [HttpPost("return")]
        public async Task<IActionResult> ReturnBook([FromBody] ReturnRequest request)
        {
            await _libraryRepo.ReturnBook(request.TransactionId);
            return Ok(new { message = "Book returned successfully" });
        }

        [HttpPost("renew")]
        public async Task<IActionResult> RenewBook([FromBody] RenewRequest request)
        {
            var success = await _libraryRepo.RenewBook(request.TransactionId);
            if (success) return Ok(new { message = "Book renewed successfully" });
            return BadRequest(new { message = "Renewal limit reached" });
        }

        [HttpGet("history/{userId}")]
        public async Task<IActionResult> GetUserHistory(int userId)
        {
            var history = await _libraryRepo.GetUserHistory(userId);
            return Ok(history);
        }

        [HttpGet("overdue")]
        public async Task<IActionResult> GetOverdueBooks()
        {
            var overdue = await _libraryRepo.GetOverdueBooks();
            return Ok(overdue);
        }
    }

    public class IssueRequest { public int UserId { get; set; } public int BookId { get; set; } }
    public class ReturnRequest { public int TransactionId { get; set; } }
    public class RenewRequest { public int TransactionId { get; set; } }
}
