using System;
using System.Collections.Generic;

namespace Fast.Web.Models
{
    public class RouteModel : BaseModel
    {
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public string territory { get; set; }
        public int order_number { get; set; }
    }

    public class RouteListModel
    {
        public string District { get; set; }
        public string Territory { get; set; }
        public List<CustomerModel> Customers { get; set; }
        public List<RouteModel> Routes { get; set; }
    }
}