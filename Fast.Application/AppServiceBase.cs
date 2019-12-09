using Fast.Application.Interfaces;
using Fast.Domain.Interfaces.Services;
using Fast.Infra.CrossCutting.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Fast.Application
{
    public class AppServiceBase<TEntity> : IAppServiceBase where TEntity : class
    {
        private readonly IServiceBase<TEntity> _service;

        public AppServiceBase(IServiceBase<TEntity> service)
        {
            _service = service;
        }

        public long Add(string data)
        {
            if (string.IsNullOrEmpty(data)) return 0;

            TEntity entity = JsonConvert.DeserializeObject<TEntity>(data);
            _service.Add(entity);
            _service.Complete();

            var idProp = entity.GetType().GetProperty("ID");

            return idProp == null ? 0 : (long)idProp.GetValue(entity, null);
        }

        public string GetById(long id, bool asNoTracking = false)
        {
            TEntity entity = _service.GetById(id, asNoTracking);
            string result = entity != null ? JsonHelper<TEntity>.Serialize(entity) : string.Empty;
            return result;
        }

        public string GetBy(string propertyName, string propertyValue, bool isExcludeDeleted = false)
        {
            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter(propertyName, propertyValue, Operator.Equals));
            if (isExcludeDeleted)
                filters.Add(new QueryFilter("IsDeleted", "0"));

            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            IList<TEntity> entities = _service.Find(query).ToList();
            string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities[0]) : string.Empty;

            return result;
        }

        public string GetBy(string propertyName, long propertyValue, bool isExcludeDeleted = false)
        {
            return GetBy(propertyName, propertyValue.ToString(), isExcludeDeleted);
        }

        public string GetAll(bool isExcludeDeleted = false)
        {
            if (isExcludeDeleted)
            {
                ICollection<QueryFilter> filters = new List<QueryFilter>();
                filters.Add(new QueryFilter("IsDeleted", "0"));

                Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
                IEnumerable<TEntity> entities = _service.Find(query).ToList();
                string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;

                return result;
            }
            else
            {
                IEnumerable<TEntity> entities = _service.GetAll();
                string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;
                return result;
            }
        }

        public void Update(string data)
        {
            if (string.IsNullOrEmpty(data)) return;

            TEntity entity = JsonConvert.DeserializeObject<TEntity>(data);
            _service.Update(entity);
            _service.Complete();
        }

        public void Remove(long id)
        {
            TEntity entity = _service.GetById(id);
            _service.Remove(entity);
            _service.Complete();
        }

        public void RemoveRange(string dataList)
        {
            List<TEntity> entityList = JsonConvert.DeserializeObject<List<TEntity>>(dataList);
            List<TEntity> result = new List<TEntity>();
            foreach (var item in entityList)
            {
                var idProp = item.GetType().GetProperty("ID").GetValue(item, null);
                TEntity entity = _service.GetById(long.Parse(idProp.ToString()));
                result.Add(entity);
            }
            _service.RemoveRange(result);
            _service.Complete();
        }

        public string Get(ICollection<QueryFilter> filters)
        {
            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            TEntity entity = _service.Get(query);
            string result = entity != null ? JsonHelper<TEntity>.Serialize(entity) : string.Empty;
            return result;
        }

        public string Get(ICollection<QueryFilter> filters, bool asNoTracking = false)
        {
            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            TEntity entity = _service.Get(query, asNoTracking);
            string result = entity != null ? JsonHelper<TEntity>.Serialize(entity) : string.Empty;
            return result;
        }

        public string Find(ICollection<QueryFilter> filters)
        {
            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            IEnumerable<TEntity> entities = _service.Find(query).ToList();
            string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;
            return result;
        }

        public string FindNoTracking(ICollection<QueryFilter> filters)
        {
            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            IEnumerable<TEntity> entities = _service.FindNoTracking(query).ToList();
            string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;
            return result;
        }

        public string FindBy(string propertyName, string propertyValue, bool isExcludeDeleted = false)
        {
            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter(propertyName, propertyValue, Operator.Equals));
            if (isExcludeDeleted)
                filters.Add(new QueryFilter("IsDeleted", "0"));

            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            IEnumerable<TEntity> entities = _service.Find(query).ToList();
            string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;

            return result;
        }

        public string FindBy(string propertyName, long propertyValue, bool isExcludeDeleted = false)
        {
            return FindBy(propertyName, propertyValue.ToString(), isExcludeDeleted);
        }

        public string FindByNoTracking(string propertyName, string propertyValue, bool isExcludeDeleted = false)
        {
            ICollection<QueryFilter> filters = new List<QueryFilter>();
            filters.Add(new QueryFilter(propertyName, propertyValue));
            if (isExcludeDeleted)
                filters.Add(new QueryFilter("IsDeleted", "0"));

            Expression<Func<TEntity, bool>> query = ExpressionBuilder.GetExpression<TEntity>(filters);
            IEnumerable<TEntity> entities = _service.FindNoTracking(query).ToList();
            string result = entities.Any() ? JsonHelper<TEntity>.Serialize(entities) : string.Empty;

            return result;
        }
    }
}
