using Fast.Domain.Interfaces.Services;
using Fast.Domain.Services;
using Ninject.Modules;

namespace Fast.Infra.CrossCutting.IoC
{
	public class NinjectServiceModule : NinjectModule
	{
		public override void Load()
		{
			Bind(typeof(IServiceBase<>)).To(typeof(ServiceBase<>));
			Bind<IUserService>().To<UserService>();
			Bind<IUserLogService>().To<UserLogService>();
			Bind<IRoleService>().To<RoleService>();
			Bind<IRoleModuleService>().To<RoleModuleService>();
			Bind<IModuleService>().To<ModuleService>();
			Bind<ILocationService>().To<LocationService>();
			Bind<ICustomerService>().To<CustomerService>();
		}
	}
}
