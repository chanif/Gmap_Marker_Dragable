using Fast.Domain.Interfaces.Repositories;
using Fast.Infra.Data;
using Ninject.Modules;

namespace Fast.Infra.CrossCutting.IoC
{
	public class NinjectRepositoryModule : NinjectModule
	{
		public override void Load()
		{
			Bind(typeof(IRepositoryBase<>)).To(typeof(RepositoryBase<>));
			Bind<IUnitOfWork>().To<UnitOfWork>().InSingletonScope();
		}
	}
}
