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
            model.Customers = model.Customers.OrderBy(x => x.teritorry).ToList();

            return View(model);
        }

        [HttpPost]
        public ActionResult Update(List<string> customers, string territory = "", string visit_day = "")
        {
            try
            {
                foreach(var cust in customers)
                {
                    string customer = _customerAppService.FindByNoTracking("customer_code", cust);
                    var customerModel = JsonConvert.DeserializeObject<List<CustomerModel>>(customer).FirstOrDefault();
                    
                    if(territory != "")
                        customerModel.teritorry = territory;
                    if (visit_day != "")
                        customerModel.visit_day = visit_day;

                    var data = JsonHelper<CustomerModel>.Serialize(customerModel);
                    _customerAppService.Update(data);
                }

                return Json(new { Status = "True" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = "False" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}