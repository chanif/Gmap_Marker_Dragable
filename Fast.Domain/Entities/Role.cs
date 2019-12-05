namespace Fast.Domain.Entities
{
	public class Role : BaseEntity
	{
		public string Name { get; set; }
		public string DisplayName { get; set; }
		public string Description { get; set; }
	}
}
