using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class UserAppService : AppServiceBase<User>, IUserAppService
	{
		public UserAppService(IUserService serviceBase) : base(serviceBase)
		{
		}
	}
}