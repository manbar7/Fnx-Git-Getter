using Fnx_Git_Api.Entities.Models;
using Fnx_Git_Api.Models;
using Fnx_Git_Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fnx_Git_Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public string adminUsername;
        public string adminPassword;
        public IAuth AuthService;

        public AuthController( IConfiguration configuration, IAuth authService)
        {
            _configuration = configuration;
            adminUsername = _configuration.GetValue<string>("Authorization:username");
            adminPassword = _configuration.GetValue<string>("Authorization:password");
            this.AuthService = authService;

        }

        [HttpPost,Route("login")]
        public ActionResult<string> Login(UserDto request)
        {
            ActionResult<string> result =  this.AuthService.Login(request);

            return result;
        }

    }
}
