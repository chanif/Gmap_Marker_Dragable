using AutoMapper;
using Fast.Domain.Entities;
using Fast.Web.Models;

namespace Fast.Web.App_Start
{
	public class AutomapperConfig : Profile
	{
		public AutomapperConfig()
		{
			CreateMap<User, UserModel>()
				.ForMember(x => x.LastLoginDateStr, map => map.MapFrom(p => p.LastLoginDate.HasValue ? p.LastLoginDate.Value.ToString("dd/MM/yyyy hh:mm:ss") : string.Empty))
				.ForMember(x => x.LocationName, map => map.MapFrom(p => p.Location == null ? string.Empty : p.Location.Name))
				.ForMember(x => x.FullName, map => map.MapFrom(p => p.FirstName + " " + p.LastName))
				.ForMember(x => x.RoleName, map => map.MapFrom(p => p.Role.DisplayName));
			CreateMap<UserModel, User>();

			CreateMap<Module, ModuleModel>();
			CreateMap<ModuleModel, Module>();

			CreateMap<Role, UserRoleModel>();
			CreateMap<UserRoleModel, Role>();

			CreateMap<Location, LocationModel>();
			CreateMap<LocationModel, Location>();

			CreateMap<UserLog, UserLogModel>()
				.ForMember(m => m.LogTimeStr, map => map.MapFrom(p => p.LogTime.ToString("dd/MM/yyyy hh:mm:ss")));
			CreateMap<UserLogModel, UserLog>();
		}
	}
}