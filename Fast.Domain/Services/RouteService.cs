﻿using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Repositories;
using Fast.Domain.Interfaces.Services;

namespace Fast.Domain.Services
{
	public class RouteService : ServiceBase<Route>, IRouteService
    {
		public RouteService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}
