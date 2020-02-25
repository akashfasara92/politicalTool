﻿using System;
using System.IO;

namespace VideoViewer.Infrastructure
{
    public class IoHelper
    {
        public static string GetFileExtension(string fileName)
        {
            try
            {
                var fileParts = fileName.Split('.');
                return fileParts.Length == 1 ? string.Empty : fileParts[fileParts.Length - 1].ToLower();
            }
            catch (Exception ex)
            {
                var exception = ex;
                return string.Empty;
            }
        }

        public byte[] GetBytesFromFile(string fullFilePath)
        {
            FileStream fs = null;
            try
            {
                fs = File.OpenRead(fullFilePath);
                byte[] bytes = new byte[fs.Length];
                fs.Read(bytes, 0, Convert.ToInt32(fs.Length));
                return bytes;
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                    fs.Dispose();
                }
            }
        }
    }
}