﻿using System;

namespace Fast.Domain.Entities
{
	public class Approval : BaseEntity
	{
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public string territory_old { get; set; }
        public string territory_new { get; set; }
        public bool approve { get; set; }
        public DateTime timestamp { get; set; }
    }
}
