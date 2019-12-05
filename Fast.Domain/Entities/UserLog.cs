using System;

namespace Fast.Domain.Entities
{
	public class UserLog
	{
		public int ID { get; set; }
		public string UserName { get; set; }
		public string Module { get; set; }
		public string Message { get; set; }
		public DateTime LogTime { get; set; }
		public string IPAddress { get; set; }
		public string MoreInfo { get; set; }
		public bool IsError { get; set; }
	}
}
