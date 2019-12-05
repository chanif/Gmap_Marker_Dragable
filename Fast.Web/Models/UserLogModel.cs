using System;

namespace Fast.Web.Models
{
	public class UserLogModel 
	{
		public int ID { get; set; }
		public int UserID { get; set; }
		public string UserName { get; set; }
		public string UserFullName { get; set; }
		public string Module { get; set; }
		public string Message { get; set; }
		public DateTime LogTime { get; set; }
		public string LogTimeStr { get; set; }
		public string IPAddress { get; set; }
		public string MoreInfo { get; set; }
	}
}