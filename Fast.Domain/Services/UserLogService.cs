using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;
using System;

namespace Fast.Domain.Services
{
	public class UserLogService : ServiceBase<UserLog>, IUserLogService
	{
		public UserLogService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}

		public void Error(string username, string module, string message, string ipaddress, string browser)
		{
			Log(username, module, message, ipaddress, browser, true);
		}

		public void Log(string username, string module, string message, string ipaddress, string browser)
		{
			Log(username, module, message, ipaddress, browser, false);
		}

		private void Log(string username, string module, string message, string ipaddress, string browser, bool isError)
		{
			try
			{
				UserLog log = new UserLog();
				log.UserName = username;
				log.Message = message;
				log.IsError = isError;
				log.LogTime = DateTime.Now;
				log.Module = module;

				// get ip address
				log.IPAddress = ipaddress;

				// get browser information			
				log.MoreInfo = browser;

				base.Add(log);
				base.Complete();
			}
			catch { }
		}
	}
}
