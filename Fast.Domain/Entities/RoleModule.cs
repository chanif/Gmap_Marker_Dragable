namespace Fast.Domain.Entities
{
	public class RoleModule : BaseEntity
	{
		public int RoleID { get; set; }
		public int ModuleID { get; set; }

		public virtual Role Role { get; set; }
		public virtual Module Module { get; set; }
	}
}
