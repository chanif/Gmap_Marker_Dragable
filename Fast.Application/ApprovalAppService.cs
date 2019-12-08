using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class ApprovalAppService : AppServiceBase<Approval>, IApprovalAppService
    {
		public ApprovalAppService(IApprovalService serviceBase) : base(serviceBase)
		{
		}
	}
}