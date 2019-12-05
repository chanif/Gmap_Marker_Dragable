using Fast.Infra.CrossCutting.Common;
using System.Collections.Generic;

namespace Fast.Application.Interfaces
{
	public interface IAppServiceBase
	{
		void Add(string data);
		string GetById(int id);
		string GetAll();
		void Update(string data);
		void Remove(int id);
		string Get(ICollection<QueryFilter> filters);
		string Find(ICollection<QueryFilter> filters);
	}
}
