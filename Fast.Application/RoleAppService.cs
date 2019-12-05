using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class RoleAppService : AppServiceBase<Role>, IRoleAppService
	{
		public RoleAppService(IRoleService serviceBase) : base(serviceBase)
		{
		}
	}
}