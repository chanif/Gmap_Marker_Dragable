using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class CustomerService : ServiceBase<Customer>, ICustomerService
	{
		public CustomerService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
