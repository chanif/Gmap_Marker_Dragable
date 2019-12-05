using System;

namespace Fast.Web.Models
{
	public class BaseModel
	{
		public long ID { get; set; }
		public bool IsDeleted { get; set; }
		public bool IsActive { get; set; }
		public string CreatedBy { get; set; }
		public string ModifiedBy { get; set; }
		public Nullable<DateTime> CreatedDate { get; set; }
		public Nullable<DateTime> ModifiedDate { get; set; }
	}
}