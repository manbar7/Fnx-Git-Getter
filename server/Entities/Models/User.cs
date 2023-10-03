namespace Fnx_Git_Api.Entities.Models
{
    public class User
    {
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } 
        public byte[] PasswordSalt { get; set; }

        public string getPassword()
        {
            throw new NotImplementedException();
        }

        public string getUsername()
        {
            throw new NotImplementedException();
        }

        public static implicit operator Task<object>(User v)
        {
            throw new NotImplementedException();
        }
    }
}
