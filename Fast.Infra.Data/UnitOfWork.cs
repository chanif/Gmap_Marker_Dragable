using Fast.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fast.Infra.Data
{
	public class UnitOfWork : IUnitOfWork
	{
		private bool _disposed;
		private readonly FastAppContext _context;
		public Dictionary<Type, object> Repositories = new Dictionary<Type, object>();

		public UnitOfWork()
		{
			_context = new FastAppContext();
		}

		public IRepositoryBase<TEntity> Repository<TEntity>() where TEntity : class
		{
			if (Repositories.Keys.Contains(typeof(TEntity)))
			{
				return Repositories[typeof(TEntity)] as IRepositoryBase<TEntity>;
			}

			IRepositoryBase<TEntity> repository = new RepositoryBase<TEntity>(_context);
			Repositories.Add(typeof(TEntity), repository);
			return repository;
		}

		public void Complete()
		{
			_context.SaveChanges();
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!_disposed)
			{
				if (disposing)
				{
					_context.Dispose();
				}
			}
			_disposed = true;
		}

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}
	}
}
