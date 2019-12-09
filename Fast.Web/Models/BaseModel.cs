using System;

namespace Fast.Web.Models
{
	public class BaseModel
	{
		public long ID { get; set; }
		public bool IsDeleted { get; set; }
	}
}