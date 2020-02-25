﻿using System.Web.Mvc;
using System.Web.Routing;

namespace VideoViewer
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Watch", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}