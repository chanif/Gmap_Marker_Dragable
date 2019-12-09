using System;

namespace Fast.Domain.Entities
{
	public class Route : BaseEntity
	{
        public string customer_code { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public string territory { get; set; }
        public int order_number { get; set; }
    }
}
