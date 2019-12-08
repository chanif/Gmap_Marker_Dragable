using Fast.Application;
using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;

namespace srconecms.web.Application
{
	public class RouteAppService : AppServiceBase<Route>, IRouteAppService
	{
		public RouteAppService(IRouteService serviceBase) : base(serviceBase)
		{
		}
	}
}