using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class LocationAppService : AppServiceBase<Location>, ILocationAppService
	{
		public LocationAppService(ILocationService serviceBase) : base(serviceBase)
		{
		}
	}
}