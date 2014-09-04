<%@ WebHandler Language="C#" Class="Test" %>

using System;
using System.Web;
using System.Web.Script.Serialization;

public class Test : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        System.Threading.Thread.Sleep(2000); // simulate load
        JavaScriptSerializer json = new JavaScriptSerializer();
        context.Response.ContentType = "application/json; charset=utf-8";
        if (context.Request.QueryString["value"].ToLower() == "christoff@cstruter.com")
        {
            context.Response.Write(json.Serialize(new { isValid = false, message = "User already exists" })); // simulate existing user
        }
        else
        {
            context.Response.Write(json.Serialize(new { isValid = true }));
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}