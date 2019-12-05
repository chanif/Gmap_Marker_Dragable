using Fast.Application.Interfaces;
using Fast.Domain.Entities;
using Fast.Domain.Interfaces.Services;
using Fast.Web.Models;
using Fast.Web.Resources;
using Fast.Web.Utils;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Fast.Web.Controllers
{
	[CustomAuthorize(1)]
	public class UserController : Controller
	{
		private readonly IUserAppService _userAppService;
		private readonly IUserService _userService;
		private readonly IRoleService _roleService;
		private readonly ILocationService _locationService;

		public UserController(IUserAppService userAppService,
			IUserService userService,
			ILocationService regionService,
			IRoleService roleService)
		{
			_userAppService = userAppService;
			_userService = userService;
			_roleService = roleService;
			_locationService = regionService;
		}

		#region DropDown
		private List<SelectListItem> BindDropDownRole()
		{
			List<Role> roleList = _roleService.GetAll().Where(x => !x.IsDeleted).ToList();
			List<SelectListItem> _menuList = new List<SelectListItem>();

			_menuList.Add(new SelectListItem
			{
				Text = MessageResources.PleaseSelect,
				Value = "0"
			});

			foreach (var role in roleList)
			{
				_menuList.Add(new SelectListItem
				{
					Text = role.Name,
					Value = role.ID.ToString()
				});
			}

			return _menuList;
		}

		private List<SelectListItem> BindDropDownLocation()
		{
			List<Location> regionList = _locationService.GetAll().Where(x => !x.IsDeleted).ToList();
			List<SelectListItem> _menuList = new List<SelectListItem>();

			_menuList.Add(new SelectListItem
			{
				Text = MessageResources.PleaseSelect,
				Value = "0"
			});

			foreach (var region in regionList)
			{
				_menuList.Add(new SelectListItem
				{
					Text = region.Name,
					Value = region.ID.ToString()
				});
			}

			return _menuList;
		}
		#endregion

		// GET: User
		public ActionResult Index()
		{
			ViewBag.LocationList = BindDropDownLocation();
			ViewBag.RoleList = BindDropDownRole();

			return View();
		}

		// GET: User/Details/5
		public ActionResult Details(int id)
		{
			return View();
		}

		// GET: User/Create
		public ActionResult Create()
		{
			return View();
		}

		// POST: User/Create
		[HttpPost]
		public ActionResult Create(FormCollection collection)
		{
			try
			{
				// TODO: Add insert logic here

				return RedirectToAction("Index");
			}
			catch
			{
				return View();
			}
		}

		// GET: User/Edit/5
		public ActionResult Edit(int id)
		{
			return View();
		}

		// POST: User/Edit/5
		[HttpPost]
		public ActionResult Edit(int id, FormCollection collection)
		{
			try
			{
				// TODO: Add update logic here

				return RedirectToAction("Index");
			}
			catch
			{
				return View();
			}
		}

		// GET: User/Delete/5
		public ActionResult Delete(int id)
		{
			return View();
		}

		// POST: User/Delete/5
		[HttpPost]
		public ActionResult Delete(int id, FormCollection collection)
		{
			try
			{
				// TODO: Add delete logic here

				return RedirectToAction("Index");
			}
			catch
			{
				return View();
			}
		}


		[HttpPost]
		public ActionResult GetAll()
		{
			var draw = Request.Form.GetValues("draw").FirstOrDefault();
			var start = Request.Form.GetValues("start").FirstOrDefault();
			var length = Request.Form.GetValues("length").FirstOrDefault();
			var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
			var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
			var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

			// Paging Size (10,20,50,100)    
			int pageSize = length != null ? Convert.ToInt32(length) : 0;
			int skip = start != null ? Convert.ToInt32(start) : 0;

			int recordsTotal = 0;
			int recordsFiltered = 0;

			var searchPredicate = PredicateBuilder.New<User>(true);
			searchPredicate = searchPredicate.And(x => !x.IsDeleted);

			IList<string> includes = new List<string> { "Role", "Location" };

			// Getting all data    
			ICollection<User> users = _userService.Find(searchPredicate, includes).ToList();

			recordsTotal = users.Count();

			// Search    
			if (!string.IsNullOrEmpty(searchValue))
			{
				users = users.Where(m => m.UserName.StartsWith(searchValue, StringComparison.OrdinalIgnoreCase) ||
											  m.FirstName.StartsWith(searchValue, StringComparison.OrdinalIgnoreCase) ||
											  m.LastName.StartsWith(searchValue, StringComparison.OrdinalIgnoreCase)).ToList();
			}

			// total number of rows count     
			recordsFiltered = users.Count();

			// Paging     
			var data = users.Skip(skip).Take(pageSize).ToList();

			// Parse user model
			var dataModel = AutoMapper.Mapper.Map<List<User>, List<UserModel>>(data);

			// Returning Json Data    
			return Json(new { data = dataModel, recordsFiltered, recordsTotal, draw }, JsonRequestBehavior.AllowGet);
		}
	}
}
