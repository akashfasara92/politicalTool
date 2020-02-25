using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Web.Mvc;
using VideoViewer.Infrastructure;
using VideoViewer.Models;

namespace VideoViewer.Controllers
{
    [RoutePrefix("watch")]
    public class WatchController : Controller
    {
        // GET: Watch
        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {
            var watchModel = new WatchModel();
            var videoCode = Request.QueryString["v"];
            if (!string.IsNullOrWhiteSpace(videoCode))
            {
                var directoryPath = ConfigHelper.CdnDomainPath + CdnDirectories.JsonFilePaths;

                var files = Directory.GetFiles(directoryPath, "*.json");
                if (files.Length == 0)
                    return View(watchModel);

                foreach (var file in files)
                {
                    var fileInfo = new FileInfo(file);
                    var extension = Path.GetExtension(fileInfo.FullName);
                    var fileName = Path.GetFileName(fileInfo.FullName);
                    if (fileName == videoCode + ".json")
                    {
                        var jsonText = System.IO.File.ReadAllText(file);
                        watchModel.Title = GetJsonTokenValue(jsonText, "title");
                        watchModel.VideoUrl = GetJsonTokenValue(jsonText, "video_url");
                        watchModel.Description = GetJsonTokenValue(jsonText, "description");

                        var tagArray = GetJsonTokenValue(jsonText, "tags").Replace("[", "").Replace("]", "").Replace('"', ' ').Trim().Replace('\r', ' ').Trim().Replace('\n', ' ').Trim();
                        watchModel.Tags = tagArray;
                        break;
                    }
                }
            }

            return View(watchModel);
        }

        private string GetJsonTokenValue(string jsonString, string tokenName)
        {
            try
            {
                var jsonObj = (JObject)JsonConvert.DeserializeObject(jsonString);
                if (jsonObj?.Property(tokenName) == null) return string.Empty;
                return jsonObj.Property(tokenName).Value.ToString();
            }
            catch (Exception exception)
            {
                return string.Empty;
            }
        }
    }
}