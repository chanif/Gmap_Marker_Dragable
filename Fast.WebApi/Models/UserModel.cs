using System;

namespace Fast.WebApi.Models
{
	public class UserModel : BaseModel
	{
		public int ID { get; set; }
		public int RoleID { get; set; }
		public Nullable<int> LocationID { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public Nullable<DateTime> DateOfBirth { get; set; }
		public string Phone { get; set; }
		public string Address { get; set; }
		public string PhotoPath { get; set; }
		public string Email { get; set; }
		public string Status { get; set; }
		public Nullable<DateTime> LastLoginDate { get; set; }
		public Nullable<DateTime> LastLockoutDate { get; set; }
		public Nullable<int> FailedPasswordCount { get; set; }
		public Nullable<bool> UserPending { get; set; }
		public string Token { get; set; }
		public bool IsDefault { get; set; }
		public bool IsLocked { get; set; }
		public bool IsModified { get; set; }
		public bool IsApproved { get; set; }

		public virtual LocationModel Location { get; set; }
		public virtual UserRoleModel Role { get; set; }
	}
}