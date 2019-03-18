using Microsoft.EntityFrameworkCore;
using OutflowManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Data
{
    public class OutflowManagerContext: DbContext
    {
        public OutflowManagerContext(DbContextOptions<OutflowManagerContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<WishListItem> WishListItems { get; set; }

    }
}
