using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class ModuleAppService : AppServiceBase<Module>, IModuleAppService
	{
		public ModuleAppService(IModuleService serviceBase) : base(serviceBase)
		{
		}
	}
}