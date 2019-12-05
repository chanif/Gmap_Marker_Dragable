using System;

namespace Fast.Web.Models
{
	public class LocationModel : BaseModel
	{
		public string Name { get; set; }
		public Nullable<int> ParentID { get; set; }
	}
}