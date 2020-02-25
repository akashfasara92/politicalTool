namespace VideoViewer.Models
{
    public class WatchModel
    {
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public string[] TagArray { get; set; }

        public WatchModel()
        {
            Title = VideoUrl = Description = Tags = string.Empty;
            TagArray = new string[] { };
        }
    }

    //public class Subscriber
    //{
    //    public string email { get; set; }
    //    public IList<string> tags { get; set; }
    //}

    //public class Example
    //{
    //    public IList<Subscriber> subscribers { get; set; }
    //}
}