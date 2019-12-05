using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class CustomerAppService : AppServiceBase<Customer>, ICustomerAppService
	{
		public CustomerAppService(ICustomerService serviceBase) : base(serviceBase)
		{
		}
	}
}