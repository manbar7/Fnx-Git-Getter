namespace Fnx_Git_Api.Models
{
    public class GitResponse
    {
        public double total_count { get; set; }
        public bool incomplete_results { get; set; }
        public GitRepo[]? items { get; set; }
    }
}
