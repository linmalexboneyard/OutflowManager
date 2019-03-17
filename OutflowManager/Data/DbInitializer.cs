using OutflowManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Data
{
    public class DbInitializer
    {
        public static void Initialize(OutflowManagerContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Expenses.Any())
            {
                return;   // DB has been seeded
            }

            var expenses = new Expense[]
            {
                new Expense{Name="Mortgage"},
                new Expense{Name="Internet Bill"},
                new Expense{Name="Electric Bill"}
            };
            foreach (Expense s in expenses)
            {
                context.Expenses.Add(s);
            }
            context.SaveChanges();

        }
    }
}
