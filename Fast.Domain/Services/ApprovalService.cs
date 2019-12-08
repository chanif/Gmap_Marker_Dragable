using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class ApprovalService : ServiceBase<Approval>, IApprovalService
    {
		public ApprovalService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
