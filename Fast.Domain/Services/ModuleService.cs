using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class ModuleService : ServiceBase<Module>, IModuleService
	{
		public ModuleService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
