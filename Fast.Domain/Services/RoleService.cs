using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class RoleService : ServiceBase<Role>, IRoleService
	{
		public RoleService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
