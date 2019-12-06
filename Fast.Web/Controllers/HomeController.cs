using Fast.Application.Interfaces;
using Fast.Infra.CrossCutting.Common;
using Fast.Web.Models;
using Fast.Web.Utils;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using System.Web;

namespace Fast.Web.Controllers
{
	public class HomeController : Controller
	{
        private readonly ICustomerAppService _customerAppService;
        public HomeController(ICustomerAppService customerAppService)
        {
            _customerAppService = customerAppService;
        }

        public ActionResult Index()
        {
            var model = new CustomerListModel();
            model.District = "DJKT001";

            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter("district", model.District));

            string customers = _customerAppService.Find(filters);
            //string customers = _customerAppService.GetAll();
            model.Customers = string.IsNullOrEmpty(customers) ? new List<CustomerModel>() : JsonConvert.DeserializeObject<List<CustomerModel>>(customers);
            model.Customers = model.Customers.OrderBy(x => x.dati_II).ToList();

            return View(model);
        }
    }
}