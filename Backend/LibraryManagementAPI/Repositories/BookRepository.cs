using Dapper;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using System.Data;

namespace LibraryManagementAPI.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooks();
        Task<Book> GetBookById(int id);
        Task<int> AddBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(int id);
    }

    public class BookRepository : IBookRepository
    {
        private readonly DapperContext _context;

        public BookRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            var query = "sp_GetAllBooks";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<Book>(query, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Book> GetBookById(int id)
        {
            var query = "sp_GetBookById";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<Book>(query, new { BookId = id }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> AddBook(Book book)
        {
            var query = "sp_AddBook";
            using (var connection = _context.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("Title", book.Title);
                parameters.Add("Author", book.Author);
                parameters.Add("ISBN", book.ISBN);
                parameters.Add("CategoryId", book.CategoryId);
                parameters.Add("Publisher", book.Publisher);
                parameters.Add("PublicationYear", book.PublicationYear);
                parameters.Add("TotalCopies", book.TotalCopies);
                
                return await connection.ExecuteScalarAsync<int>(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task UpdateBook(Book book)
        {
            var query = "sp_UpdateBook";
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { 
                    book.BookId, book.Title, book.Author, book.CategoryId, book.TotalCopies 
                }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task DeleteBook(int id)
        {
            var query = "sp_DeleteBook";
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { BookId = id }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
