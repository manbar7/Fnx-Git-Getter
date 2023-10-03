namespace Fnx_Git_Api.Services
{
    public class ConfigService :IConfigService
    {
        private readonly IConfiguration configuration;
        public ConfigService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GetValue(string key)
        {
            return configuration.GetSection(key).Value;
        }
    }
}
