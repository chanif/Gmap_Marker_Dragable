﻿using System;
using System.Collections.Generic;

namespace Fast.Web.Models
{
	public class CustomerModel : BaseModel
	{
        public string area { get; set; }
        public string district { get; set; }
        public string teritorry { get; set; }
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public long customer_industry_volume { get; set; }
        public decimal geographical_x { get; set; }
        public decimal geographical_y { get; set; }
        public string cluster_icis { get; set; }
        public string cluster_nrs { get; set; }
        public string cust_seg_type { get; set; }
        public string sro_account { get; set; }
        public string cust_city { get; set; }
        public string cust_district { get; set; }
        public string provinsi { get; set; }
        public string dati_II { get; set; }
        public string kecamatan { get; set; }
        public string kelurahan { get; set; }
        public Double TotalHMIPerCustomer { get; set; }
        public Double TotalPerCustomer { get; set; }
        public Double SellPercentageHMICustomer { get; set; }
        public string hari_kunjungan { get; set; }
        public string pposm_category { get; set; }
        public string cluster { get; set; }
        public int order_number { get; set; }
    }

    public class CustomerListModel
    {
        public string District { get; set; }
        public string Territory { get; set; }
        public List<CustomerModel> Customers { get; set; }
    }

    public class CustomerSaveModel : BaseModel
    {
        public string teritorry { get; set; }
        public string customer_code { get; set; }
        public int order_number { get; set; }
    }
}