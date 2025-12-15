namespace LibraryManagementAPI.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public string BookTitle { get; set; }
        public string FullName { get; set; } // User's name
        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string Status { get; set; }
        public int RenewalCount { get; set; }
        public decimal? FineAmount { get; set; } // Calculated on fly or joined
    }

    public class Fine
    {
        public int FineId { get; set; }
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime? PaidDate { get; set; }
        public string Status { get; set; }
    }

    public class Reservation
    {
        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public string BookTitle { get; set; }
        public DateTime ReservationDate { get; set; }
        public string Status { get; set; }
    }
}
