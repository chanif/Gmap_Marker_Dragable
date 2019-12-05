using System.Web;

namespace Fast.Web.Utils
{
	public static class Helper
	{
		public static string GetBrowser()
		{
			return HttpContext.Current.Request.Browser.Browser + " " + HttpContext.Current.Request.Browser.Version;
		}

		public static string GetVisitorIPAddress()
		{
			string IPAdd = string.Empty;
			IPAdd = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
			if (string.IsNullOrEmpty(IPAdd))
				IPAdd = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
			return IPAdd;
		}

		private static string RemoveExtraHyphen(string text)
		{
			if (text.Contains("__"))
			{
				text = text.Replace("__", "_");
				return RemoveExtraHyphen(text);
			}
			return text;
		}
	}
}