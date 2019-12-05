using AutoMapper;
using Fast.Domain.Entities;
using Fast.Infra.CrossCutting.Common;
using Fast.Infra.Data;
using Fast.Web.Models;
using Fast.Web.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Fast.Web.Controllers
{
	public class LoginController : Controller
	{
		public ActionResult Index()
		{
			if (Session["UserLogon"] != null)
			{
				return RedirectToAction("Index", "Home");
			}

			return View();
		}

		[HttpPost]
		public ActionResult SignIn(UserModel model)
		{
			try
			{
				FastAppContext db = new FastAppContext();
				User user = db.Users.Where(m => m.UserName == model.UserName).FirstOrDefault();
				if (user == null)
				{
					ViewBag.Message = MessageResources.InvalidUsername;
				}
				else
				{
					bool isValid = user.Password == AuthHelper.Encrypt(model.Password);
					if (isValid)
					{
						if (user.Status == Constants.UserStatus.PENDING)
						{
							ViewBag.Message = MessageResources.AccountPending;
						}
						else if (user.IsDeleted)
						{
							ViewBag.Message = MessageResources.UserDeleted;
						}
						else if (user.IsLocked)
						{
							ViewBag.Message = MessageResources.AccountLocked;
						}
						else if (user.Status == Constants.UserStatus.BANNED)
						{
							ViewBag.Message = MessageResources.AccountNonActive;
						}
						else
						{
							user.LastLoginDate = DateTime.Now;
							db.SaveChanges();

							UserModel userModel = Mapper.Map<User, UserModel>(user);
							Session["UserLogon"] = userModel;

							List<int> permissionList = db.RoleModules.Where(x => x.RoleID == user.RoleID && !x.IsDeleted).Select(x => x.ModuleID).ToList();
							List<Module> moduleList = db.Modules.Where(y => permissionList.Any(x => x == y.ID) && !y.IsDeleted).OrderBy(x => x.DisplayOrder).ToList();
							List<ModuleModel> Menu = Mapper.Map<List<Module>, List<ModuleModel>>(moduleList);
							Session["AuthMenu"] = Menu;

							return RedirectToAction("Index", "Home");
						}
					}
					else
					{
						ViewBag.Message = MessageResources.InvalidPassword;
					}
				}
			}
			catch (Exception ex)
			{
				ViewBag.Message = ex.Message;
			}

			return View("Index", model);
		}

		[HttpGet]
		public ActionResult SignOut()
		{
			try
			{
				HttpContext.Session.Clear();
				Session.Abandon();
				return RedirectToAction("Index", "Login");
			}
			catch
			{
				throw;
			}
		}
	}
}