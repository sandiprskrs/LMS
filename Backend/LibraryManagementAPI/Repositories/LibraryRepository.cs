using Dapper;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using System.Data;

namespace LibraryManagementAPI.Repositories
{
    public interface ILibraryRepository
    {
        Task<bool> IssueBook(int userId, int bookId);
        Task ReturnBook(int transactionId);
        Task<bool> RenewBook(int transactionId);
        Task<IEnumerable<Transaction>> GetUserHistory(int userId);
        Task<IEnumerable<Transaction>> GetOverdueBooks();
    }

    public class LibraryRepository : ILibraryRepository
    {
        private readonly DapperContext _context;

        public LibraryRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<bool> IssueBook(int userId, int bookId)
        {
            var query = "sp_IssueBook";
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.ExecuteScalarAsync<int>(query, new { UserId = userId, BookId = bookId }, commandType: CommandType.StoredProcedure);
                return result == 1;
            }
        }

        public async Task ReturnBook(int transactionId)
        {
            var query = "sp_ReturnBook";
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { TransactionId = transactionId }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<bool> RenewBook(int transactionId)
        {
            var query = "sp_RenewBook";
            using (var connection = _context.CreateConnection())
            {
                 var result = await connection.ExecuteScalarAsync<int>(query, new { TransactionId = transactionId }, commandType: CommandType.StoredProcedure);
                 return result == 1;
            }
        }

        public async Task<IEnumerable<Transaction>> GetUserHistory(int userId)
        {
            var query = "sp_GetUserHistory";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<Transaction>(query, new { UserId = userId }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Transaction>> GetOverdueBooks()
        {
            var query = "sp_GetOverdueBooks";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<Transaction>(query, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
