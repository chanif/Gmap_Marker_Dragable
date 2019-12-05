using System;
using System.ComponentModel.DataAnnotations;

namespace Fast.Web.Models
{
	public class UserModel : BaseModel
	{
		[Required(ErrorMessage = "Please fill User Name")]
		public string UserName { get; set; }
		[Required(ErrorMessage = "Please Fill Password")]
		public string Password { get; set; }
		public string NewPassword { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string FullName { get; set; }
		public string Token { get; set; }
		public string Status { get; set; }
		public string LastLoginDateStr { get; set; }
		public int RoleID { get; set; }
		public string RoleName { get; set; }
		public int? LocationID { get; set; }
		public string LocationName { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Address { get; set; }
		public Nullable<DateTime> BirthDate { get; set; }
		public bool IsLocked { get; set; }
		public bool IsPending { get; set; }
	}
}