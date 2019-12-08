using Fast.Application;
using Fast.Application.Interfaces;
using Ninject.Modules;
using srconecms.web.Application;

namespace Fast.Infra.CrossCutting.IoC
{
	public class NinjectAppServiceModule : NinjectModule
	{
		public override void Load()
		{
			Bind(typeof(IAppServiceBase)).To(typeof(AppServiceBase<>));
			Bind<IUserAppService>().To<UserAppService>();
			Bind<IUserLogAppService>().To<UserLogAppService>();
			Bind<IRoleAppService>().To<RoleAppService>();
			Bind<IModuleAppService>().To<ModuleAppService>();
			Bind<IRoleModuleAppService>().To<RoleModuleAppService>();
			Bind<ILocationAppService>().To<LocationAppService>();
			Bind<ICustomerAppService>().To<CustomerAppService>();
			Bind<IApprovalAppService>().To<ApprovalAppService>();
			Bind<IRouteAppService>().To<RouteAppService>();
		}
	}
}
