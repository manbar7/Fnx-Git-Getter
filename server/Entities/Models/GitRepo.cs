using Fnx_Git_Api.Models;

namespace Fnx_Git_Api
{
    public class GitRepo
    {
        public double id { get; set; }
        public bool? bookmarked { get; set; }
        public string node_id { get; set; } = string.Empty;
        public string url { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string full_name { get; set; }  = string.Empty;
        public Owner? owner { get; set; }
        public string color { get; set; } = string.Empty;
        public bool _default { get; set; }
        public string? description { get; set; }
        public double score { get; set; }
    }
}
