using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Text;

namespace VideoViewer.Infrastructure
{
    public class MyWebRequest
    {
        private WebRequest _request;
        private Stream _dataStream;

        public string Status { get; set; }

        public MyWebRequest(string url)
        {
            _request = WebRequest.Create(url);
        }

        public MyWebRequest(string url, string method) : this(url)
        {
            if (method.Equals("GET") || method.Equals("POST"))
            {
                // Set the Method property of the request to POST.
                _request.Method = method;
            }
            else
            {
                throw new Exception("Invalid Method Type");
            }
        }

        public MyWebRequest(string url, string method, string data) : this(url, method)
        {
            // Create POST data and convert it to a byte array.
            var postData = data;
            var byteArray = Encoding.UTF8.GetBytes(postData);
            // Set the ContentType property of the WebRequest.
            _request.ContentType = "application/json";
            // Set the ContentLength property of the WebRequest.
            _request.ContentLength = byteArray.Length;
            _request.Timeout = 6000000;
            // Get the request stream.
            _dataStream = _request.GetRequestStream();
            // Write the data to the request stream.
            _dataStream.Write(byteArray, 0, byteArray.Length);
            // Close the Stream object.
            _dataStream.Close();
        }

        public MyWebRequest(string url, string method, string data, string authorization) : this(url, method)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(data);
            this._request.ContentType = "application/x-www-form-urlencoded";
            this._request.ContentLength = (long)bytes.Length;
            this._request.Timeout = 6000000;
            bool flag = !string.IsNullOrWhiteSpace(authorization.Trim());
            if (flag)
            {
                this._request.Headers.Add(HttpRequestHeader.Authorization, authorization);
            }
            this._dataStream = this._request.GetRequestStream();
            this._dataStream.Write(bytes, 0, bytes.Length);
            this._dataStream.Close();
        }

        public string GetResponse()
        {
            // Get the original response.
            var response = _request.GetResponse();
            Status = ((HttpWebResponse)response).StatusDescription;
            // Get the stream containing all content returned by the requested server.
            _dataStream = response.GetResponseStream();
            // Open the stream using a StreamReader for easy access.
            var reader = new StreamReader(_dataStream);
            // Read the content fully up to the end.
            var responseFromServer = reader.ReadToEnd();
            // Clean up the streams.
            reader.Close();
            _dataStream.Close();
            response.Close();
            return responseFromServer;
        }

        public static string HttpUploadFile(string url, string file, string paramName, string contentType, NameValueCollection nvc)
        {
            string result;
            var boundary = "---------------------------" + DateTime.Now.Ticks.ToString("x");
            var boundarybytes = System.Text.Encoding.ASCII.GetBytes("\r\n--" + boundary + "\r\n");

            var wr = (HttpWebRequest)WebRequest.Create(url);
            wr.ContentType = "multipart/form-data; boundary=" + boundary;
            wr.Method = "POST";
            wr.KeepAlive = true;
            wr.Credentials = System.Net.CredentialCache.DefaultCredentials;
            var rs = wr.GetRequestStream();
            const string formdataTemplate = "Content-Disposition: form-data; name=\"{0}\"\r\n\r\n{1}";
            foreach (string key in nvc.Keys)
            {
                rs.Write(boundarybytes, 0, boundarybytes.Length);
                var formitem = string.Format(formdataTemplate, key, nvc[key]);
                var formitembytes = System.Text.Encoding.UTF8.GetBytes(formitem);
                rs.Write(formitembytes, 0, formitembytes.Length);
            }
            rs.Write(boundarybytes, 0, boundarybytes.Length);
            const string headerTemplate = "Content-Disposition: form-data; name=\"{0}\"; filename=\"{1}\"\r\nContent-Type: {2}\r\n\r\n";
            var header = string.Format(headerTemplate, paramName, file, contentType);
            var headerbytes = System.Text.Encoding.UTF8.GetBytes(header);
            rs.Write(headerbytes, 0, headerbytes.Length);
            var fileStream = new FileStream(file, FileMode.Open, FileAccess.Read);
            var buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) != 0)
            {
                rs.Write(buffer, 0, bytesRead);
            }
            fileStream.Close();
            var trailer = System.Text.Encoding.ASCII.GetBytes("\r\n--" + boundary + "--\r\n");
            rs.Write(trailer, 0, trailer.Length);
            rs.Close();
            WebResponse wresp = null;
            try
            {
                wresp = wr.GetResponse();
                var stream2 = wresp.GetResponseStream();
                var reader2 = new StreamReader(stream2);
                result = reader2.ReadToEnd();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
                if (wresp != null)
                {
                    wresp.Close();
                }
            }
            return result;
        }

        public static bool UrlExists(string url, int timeOut)
        {
            var result = false;

            var webRequest = WebRequest.Create(url);
            webRequest.Timeout = timeOut;
            webRequest.Method = "HEAD";
            HttpWebResponse response = null;
            try
            {
                response = (HttpWebResponse)webRequest.GetResponse();
                result = true;
            }
            catch (WebException)
            {
            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }
            }
            return result;
        }

        public static bool UrlExists(string url)
        {
            return UrlExists(url, 1200);
        }
    }
}