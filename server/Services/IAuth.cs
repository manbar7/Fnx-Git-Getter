using Fnx_Git_Api.Entities.Models;
using Fnx_Git_Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fnx_Git_Api.Services
{
    public interface IAuth
    {
        public ActionResult<string> Login(UserDto request);
    }
}
