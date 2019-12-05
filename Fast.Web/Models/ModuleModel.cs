using System;
using System.ComponentModel.DataAnnotations;

namespace Fast.Web.Models
{
	public class ModuleModel : BaseModel
	{
		public int DisplayOrder { get; set; }
		[Required]
		public string Name { get; set; }
		public string PageIcon { get; set; }
		public string PageSlug { get; set; }
		public string PageController { get; set; }
		public string PageAction { get; set; }
		public Nullable<int> ParentID { get; set; }
		public bool IsParent { get; set; }
	}
}