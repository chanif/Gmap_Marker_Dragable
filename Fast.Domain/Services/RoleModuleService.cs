using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class RoleModuleService : ServiceBase<RoleModule>, IRoleModuleService
	{
		public RoleModuleService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
