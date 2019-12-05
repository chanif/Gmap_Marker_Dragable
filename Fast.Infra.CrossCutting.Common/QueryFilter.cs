﻿namespace Fast.Infra.CrossCutting.Common
{
	public class QueryFilter
	{
		public QueryFilter(string propertyName, string value)
		{
			PropertyName = propertyName;
			Value = value;
		}

		public QueryFilter(string propertyName, string value, Operator operatorValue)
		{
			PropertyName = propertyName;
			Value = value;
			Operator = operatorValue;
		}

		public string PropertyName { get; set; }
		public string Value { get; set; }
		public Operator Operator { get; set; } = Operator.Equals;
	}
}
