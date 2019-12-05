using Fast.Infra.Data;
using Fast.Web.Models;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fast.Web.Utils
{
	/// <summary>
	/// Custom authorize attribute class
	/// </summary>
	public class CustomAuthorizeAttribute : AuthorizeAttribute
	{
		private int[] _module_ids;
		private FastAppContext _context;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="privilege_name"></param>
		public CustomAuthorizeAttribute(params int[] module_id)
		{
			this._module_ids = module_id;

			_context = new FastAppContext();
		}

		/// <summary>
		/// Override the onAuthorization
		/// </summary>
		/// <param name="filterContext"></param>
		public override void OnAuthorization(AuthorizationContext filterContext)
		{
			var account = (UserModel)filterContext.HttpContext.Session["UserLogon"];
			if (account == null)
			{
				// redirect to login page if user not logged in  
				filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "action", "Index" }, { "controller", "Login" } });
			}
			else
			{
				bool IsAuthorized = false;

				foreach (var moduleId in _module_ids)
				{
					IsAuthorized = _context.RoleModules.Any(x => x.RoleID == account.RoleID && x.ModuleID == moduleId);
					if (!IsAuthorized)
						break;
				}

				if (!IsAuthorized)
				{
					this.HandleUnauthorizedRequest(filterContext);
				}
			}
		}

		/// <summary>
		/// Override the Handle of unauthorized request
		/// </summary>
		/// <param name="filterContext"></param>
		protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
		{
			filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "action", "Index" }, { "controller", "Unauthorized" } });
		}
	}
}