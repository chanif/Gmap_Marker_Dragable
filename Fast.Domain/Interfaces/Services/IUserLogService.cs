using Fast.Domain.Entities;

namespace Fast.Domain.Interfaces.Services
{
	public interface IUserLogService : IServiceBase<UserLog>
	{
		void Log(string username, string module, string message, string ipaddress, string browser);
		void Error(string username, string module, string message, string ipaddress, string browser);
	}
}
