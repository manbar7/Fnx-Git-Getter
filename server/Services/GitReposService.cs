using Fnx_Git_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;

namespace Fnx_Git_Api.Services
{
    public class GitReposService : IGitReposService
    {
        private IConfiguration _Configuration;
        private readonly ILogger<GitReposService> _logger;
        static readonly HttpClient client = new HttpClient();
        public string apiUrlFromConfig;
        public string GitAuthorization;
        public string GitApiVersion;
        private static Dictionary<string, GitRepo>? gitBookmarks;
        public GitReposService(IConfiguration configuration, ILogger<GitReposService> logger)
        {
            _Configuration = configuration;
            _logger = logger;
            apiUrlFromConfig = _Configuration.GetValue<string>("ApiConfig:apiUrl");
            GitAuthorization = _Configuration.GetValue<string>("ApiConfig:GitAuthorization");
            GitApiVersion = _Configuration.GetValue<string>("ApiConfig:GitHub-Api-Version");
            if (client.DefaultRequestHeaders.Authorization == null)
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", "request");
                client.DefaultRequestHeaders.Add("Authorization", GitAuthorization);
                client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", GitApiVersion);
            }
            else
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", "request");
            }

            if (gitBookmarks.IsNull()) gitBookmarks = new Dictionary<string, GitRepo>();
        }

        public async Task<GitResponse> GetRepositoriesByName(string repositoryName)
        {
            var GitRepositoriesList = new GitResponse { };

            if (repositoryName == "")
            {
                return GitRepositoriesList;
            }
            try
            {
                var newResponse = await client.GetAsync(apiUrlFromConfig + repositoryName);
                string responseBody = await newResponse.Content.ReadAsStringAsync();
                var contentresponse = newResponse.Content;
                var res = JsonConvert.DeserializeObject<GitResponse>(responseBody);
                return res;

            }
            catch (Exception e)
            {
                _logger.LogInformation("error at: {time} , Message: {eror} ", DateTimeOffset.UtcNow, e.Message);
                return GitRepositoriesList;
            }

        }

        public bool SaveRepositoriesBookmark(GitRepo repository)
        {
            if (repository == null) return false;
            if (gitBookmarks.ContainsKey(repository.id.ToString())) removeRepositoriesBookmark(repository);
            gitBookmarks.Add(repository.id.ToString(), repository);
            return true;
        }

        public bool removeRepositoriesBookmark(GitRepo repository)
        {
            if (gitBookmarks.IsNull()) return false;
            gitBookmarks.Remove(repository.id.ToString());
            return true;
        }

        public Dictionary<string, GitRepo> GetRepositoriesBookmark()
        {
            if (gitBookmarks.IsNull()) return null;
            return gitBookmarks;
        }



    }
}
