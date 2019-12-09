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
	public class RouteController : Controller
	{
        private readonly ICustomerAppService _customerAppService;
        public RouteController(ICustomerAppService customerAppService)
        {
            _customerAppService = customerAppService;
        }

        public ActionResult Index(string ID = "")
        {
            var model = new CustomerListModel();
            model.District = "DJKT001";
            
            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter("district", model.District));

            string customers = _customerAppService.Find(filters);
            //string customers = _customerAppService.GetAll();
            model.Customers = string.IsNullOrEmpty(customers) ? new List<CustomerModel>() : JsonConvert.DeserializeObject<List<CustomerModel>>(customers);
            model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenBy(x=>x.order_number).ToList();

            if (ID == "")
            {
                return RedirectToAction("Index/" + model.Customers[0].teritorry);
            } else
            {
                model.Territory = ID;
                var temp_cust = model.Customers.Where(x => x.teritorry == model.Territory).ToList();

                if (temp_cust[(temp_cust.Count()-1)].order_number == 0)
                {
                    model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenBy(x => x.geographical_x).ToList();
                }

                return View(model);
            }
        }

        public ActionResult Dirrection(string ID = "")
        {
            var model = new RouteListModel();
            model.District = "DJKT001";

            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter("district", model.District));

            string customers = _customerAppService.Find(filters);
            //string customers = _customerAppService.GetAll();
            model.Customers = string.IsNullOrEmpty(customers) ? new List<CustomerModel>() : JsonConvert.DeserializeObject<List<CustomerModel>>(customers);
            model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenBy(x => x.customer_code).ToList();

            if (ID == "")
            {
                return RedirectToAction("Dirrection/" + model.Customers[0].teritorry);
            }
            else
            {
                model.Territory = ID;
                return View(model);
            }
        }
    }
}