using Dapper;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using System.Data;

namespace LibraryManagementAPI.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Login(LoginDto loginDto);
        Task<int> Register(RegisterDto registerDto);
    }

    public class AuthRepository : IAuthRepository
    {
        private readonly DapperContext _context;

        public AuthRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<User> Login(LoginDto loginDto)
        {
            var query = "sp_LoginUser";
            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { loginDto.Email }, commandType: CommandType.StoredProcedure);
                // Simple password check (In prod use BCrypt)
                if (user != null && user.PasswordHash == loginDto.Password) 
                    return user;
                return null;
            }
        }

        public async Task<int> Register(RegisterDto registerDto)
        {
            var query = "sp_RegisterUser";
            using (var connection = _context.CreateConnection())
            {
                // Simple password storage (In prod use BCrypt)
                return await connection.ExecuteScalarAsync<int>(query, 
                    new { registerDto.FullName, registerDto.Email, PasswordHash = registerDto.Password, Role = registerDto.Role }, 
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
