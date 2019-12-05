using System;

namespace Fast.WebApi.Models
{
	public class LocationModel : BaseModel
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Type { get; set; }
		public Nullable<short> Level { get; set; }
		public Nullable<int> ParentLocationID { get; set; }
	}
}