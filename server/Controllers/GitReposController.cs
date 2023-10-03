using Fnx_Git_Api.Models;
using Fnx_Git_Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;

namespace Fnx_Git_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GitReposController : ControllerBase
    {
        private readonly ILogger<GitReposController> _logger;
        private readonly IConfiguration _configuration;
        public IGitReposService ReposService;

        public GitReposController(IGitReposService ReposService, ILogger<GitReposController> logger, IConfiguration configuration )
        {
            this.ReposService = ReposService;
            _configuration = configuration;
            _logger = logger;        
        }

        [HttpPost]
        [Route("getRepositories")]
        public async Task<GitResponse> GetRepositories([FromQuery] string repository_name)
        {           
            var response =  await ReposService.GetRepositoriesByName(repository_name);
            return response;
        }


        [HttpPost]
        [Route("saveBookmark")]
        public bool SaveBookmark([FromBody] GitRepo repository)
        {
            var response = ReposService.SaveRepositoriesBookmark(repository);
            return response;
        }


        [HttpPost]
        [Route("removeBookmark")]
        public bool removeBookmark([FromBody] GitRepo repository)
        {
            var response = ReposService.removeRepositoriesBookmark(repository);
            return response;
        }

        [HttpPost]
        [Route("getRepositoriesBookmark")]
        public GitRepo[] GetRepositoriesBookmark()
        {
            var response =  this.ReposService.GetRepositoriesBookmark();
            if (!response.IsNull())
            {
                GitRepo[] repos = response.Select(item => item.Value).ToArray();
                return repos;
            } 
            return null;          
        }

    }
}