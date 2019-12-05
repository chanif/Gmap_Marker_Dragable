using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class RoleModuleAppService : AppServiceBase<RoleModule>, IRoleModuleAppService
	{
		public RoleModuleAppService(IRoleModuleService serviceBase) : base(serviceBase)
		{
		}
	}
}