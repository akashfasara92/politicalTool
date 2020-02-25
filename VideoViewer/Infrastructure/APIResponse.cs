using Newtonsoft.Json;
using System.Net;

namespace VideoViewer.Infrastructure
{
    public class APIResponse
    {
        public static dynamic GetResponseFromApi(string apiUrl, string methodType, string queryString)
        {
            var myRequest = new MyWebRequest(apiUrl, methodType, queryString);
            dynamic myResponse = JsonConvert.DeserializeObject(myRequest.GetResponse());
            return myResponse;
        }

        public static string GetStringResponseFromApi(string apiUrl, string methodType, string queryString)
        {
            var myRequest = new MyWebRequest(apiUrl, methodType, queryString);
            return WebUtility.HtmlDecode(myRequest.GetResponse());
        }

        public static string GetStringResponseFromApi(string apiUrl, string methodType, string queryString, string authorization)
        {
            MyWebRequest myWebRequest = new MyWebRequest(apiUrl, methodType, queryString, authorization);
            return WebUtility.HtmlDecode(myWebRequest.GetResponse());
        }
    }
}