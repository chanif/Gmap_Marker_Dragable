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
	public class ApprovalController : Controller
	{
        private readonly ICustomerAppService _customerAppService;
        private readonly IApprovalAppService _approvalAppService;
        public ApprovalController(ICustomerAppService customerAppService, IApprovalAppService approvalAppService)
        {
            _approvalAppService = approvalAppService;
            _customerAppService = customerAppService;
        }

        public ActionResult Index()
        {
            var model = new ApprovalListModel();

            string approvals = _approvalAppService.GetAll(true);
            model.Approvals = string.IsNullOrEmpty(approvals) ? new List<ApprovalModel>() : JsonConvert.DeserializeObject<List<ApprovalModel>>(approvals);
            model.Approvals = model.Approvals.OrderByDescending(x => x.timestamp).ToList();

            return View(model);
        }

        [HttpPost]
        public ActionResult Insert(string customers, string territory)
        {
            try
            {
                List<string> customerList = customers.Split(',').Select(x => x.Trim()).Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
                customerList = customerList.Distinct().ToList();

                foreach (var cust in customerList)
                {
                    string customer = _customerAppService.GetBy("customer_code", cust);
                    var customerModel = string.IsNullOrEmpty(customer) ? new CustomerModel() : JsonConvert.DeserializeObject<CustomerModel>(customer);
                    
                    var approval = new ApprovalModel();
                    approval.customer_code = cust;
                    approval.customer_name = customerModel.customer_name;
                    approval.customer_address = customerModel.customer_address;
                    approval.territory_old = customerModel.teritorry;
                    approval.territory_new = territory;
                    approval.timestamp = DateTime.Now;

                    string data = JsonHelper<ApprovalModel>.Serialize(approval);
                    var lalala = _approvalAppService.Add(data);
                }

                return Json(new { Status = "True" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = "False" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Approve(long ID)
        {
            try
            {
                string approval = _approvalAppService.GetById(ID, true);

                if (string.IsNullOrEmpty(approval))
                {
                    return Json(new { Status = "False" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var approvalModel = JsonConvert.DeserializeObject<ApprovalModel>(approval);
                    approvalModel.approve = true;

                    string data = JsonHelper<ApprovalModel>.Serialize(approvalModel);
                    _approvalAppService.Update(data);

                    string customer = _customerAppService.FindByNoTracking("customer_code", approvalModel.customer_code);
                    var customerModel = JsonConvert.DeserializeObject<List<CustomerModel>>(customer).FirstOrDefault();
                    customerModel.teritorry = approvalModel.territory_new;

                    data = JsonHelper<CustomerModel>.Serialize(customerModel);
                    _customerAppService.Update(data);
                }

                return Json(new { Status = "True" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = "False" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Reject(long ID)
        {
            try
            {
                string approval = _approvalAppService.GetById(ID, true);

                if (string.IsNullOrEmpty(approval))
                {
                    return Json(new { Status = "False" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var approvalModel = JsonConvert.DeserializeObject<ApprovalModel>(approval);
                    approvalModel.IsDeleted = true;

                    string data = JsonHelper<ApprovalModel>.Serialize(approvalModel);
                    _approvalAppService.Update(data);
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