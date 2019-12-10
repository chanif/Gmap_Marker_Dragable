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
                    model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenByDescending(x => x.geographical_y).ToList();
                }

                return View(model);
            }
        }

        public ActionResult Dirrection(string territory = "", int page = 1)
        {
            var model = new CustomerListModel();
            model.District = "DJKT001";

            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter("district", model.District));

            string customers = _customerAppService.Find(filters);
            //string customers = _customerAppService.GetAll();
            model.Customers = string.IsNullOrEmpty(customers) ? new List<CustomerModel>() : JsonConvert.DeserializeObject<List<CustomerModel>>(customers);
            model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenBy(x => x.order_number).ToList();

            if (territory == "")
            {
                return RedirectToAction("Dirrection", new { territory = model.Customers[0].teritorry, page = 1 });
            }
            else
            {
                model.Territory = territory;
                var temp_cust = model.Customers.Where(x => x.teritorry == model.Territory).ToList();

                if (temp_cust[(temp_cust.Count() - 1)].order_number == 0)
                {
                    model.Customers = model.Customers.OrderBy(x => x.teritorry).ThenByDescending(x => x.geographical_y).ToList();
                }

                return View(model);
            }
        }

        [HttpPost]
        public ActionResult Define(string data)
        {
            try
            {
                List<CustOrderModel> dataku = JsonConvert.DeserializeObject<List<CustOrderModel>>(data);

                int counter = 1;
                foreach(var lala in dataku)
                {
                    string cust = _customerAppService.GetById(lala.id, true);
                    var custModel = string.IsNullOrEmpty(cust) ? new CustomerModel() : JsonConvert.DeserializeObject<CustomerModel>(cust);

                    custModel.order_number = counter;

                    cust = JsonHelper<CustomerModel>.Serialize(custModel);
                    _customerAppService.Update(cust);

                    counter++;
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