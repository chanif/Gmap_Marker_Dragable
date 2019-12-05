using System.Collections.Generic;

namespace Fast.Web.Models
{
	public class RoleModuleModel : BaseModel
	{
		public int RoleID { get; set; }
		public string RoleName { get; set; }
		public List<int> ModuleIDs { get; set; }

		public RoleModuleModel()
		{
			ModuleIDs = new List<int>();
		}
	}
}