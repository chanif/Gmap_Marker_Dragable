using System;

namespace Fast.Domain.Entities
{
	public class Location : BaseEntity
	{
		public string Name { get; set; }
		public Nullable<int> ParentID { get; set; }
	}
}
