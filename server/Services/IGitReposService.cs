using Fnx_Git_Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fnx_Git_Api.Services
{
    public interface IGitReposService
    {
        public bool SaveRepositoriesBookmark(GitRepo repository);
        public bool removeRepositoriesBookmark(GitRepo repository);
        public Task<GitResponse> GetRepositoriesByName(string repositoryName);     
        public Dictionary<string, GitRepo> GetRepositoriesBookmark();

    }
}