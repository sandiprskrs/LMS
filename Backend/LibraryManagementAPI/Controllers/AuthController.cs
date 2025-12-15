using LibraryManagementAPI.Models;
using LibraryManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;

        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _authRepo.Login(loginDto);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });
            
            // In a real app, generate JWT here. Returning User for now as requested by simplicity of V1->V2 
            // but we can add JWT generation if needed. For now returning full user object including role.
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try {
                var userId = await _authRepo.Register(registerDto);
                return Ok(new { message = "User registered successfully", userId });
            } catch (Exception ex) {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
