using Fast.Domain.Entities;
using System.Data.Entity;

namespace Fast.Infra.Data
{
    public class FastAppContext : DbContext
    {
        public FastAppContext() : base("FastAppConnection")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<RoleModule> RoleModules { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}