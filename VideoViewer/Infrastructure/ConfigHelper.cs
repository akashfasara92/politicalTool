using System.Configuration;

namespace VideoViewer.Infrastructure
{
    public class ConfigHelper
    {
        public static string ApplicationUrl
        {
            get
            {
                var apiUrl = ConfigurationManager.AppSettings["ApplicationUrl"];

                if (!apiUrl.EndsWith(@"/"))
                    apiUrl += @"/";
                return apiUrl;
            }
        }

        public static string CdnDomain
        {
            get
            {
                var cdnDomainPath = ConfigurationManager.AppSettings["CdnDomain"];

                if (!cdnDomainPath.EndsWith(@"/"))
                    cdnDomainPath += @"/";
                return cdnDomainPath;
            }
        }

        public static string CdnDomainPath
        {
            get
            {
                var cdnDomainPath = ConfigurationManager.AppSettings["CdnDomainPath"];

                if (!cdnDomainPath.EndsWith(@"\"))
                    cdnDomainPath += @"\";
                return cdnDomainPath;
            }
        }

        public static string JsonKeys
        {
            get
            {
                return ConfigurationManager.AppSettings["JsonKeys"];
            }
        }
    }
}