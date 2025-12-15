namespace LibraryManagementAPI.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? ISBN { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; } // Output only
        public string? Publisher { get; set; }
        public int PublicationYear { get; set; }
        public int Quantity { get; set; }
        public int AvailableCopies { get; set; }
        public int TotalCopies { get; set; }
        public string? Status { get; set; }
    }
}
