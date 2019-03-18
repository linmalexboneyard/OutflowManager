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
            if (context.Transactions.Any())
            {
                return;   // DB has been seeded
            }

            WishListItem[] wishlistitems = new WishListItem[]
            {
                new WishListItem{ID= new Guid(),Payee="Pull-up bar", EstAmountHigh=80, EstAmountLow=20 },
                new WishListItem{ID= new Guid(),Payee="Tankless Water Heater", EstAmountHigh=2000, EstAmountLow=1500 },
                new WishListItem{ID= new Guid(),Payee="Fancy Litter Box Setup", EstAmountHigh=500, EstAmountLow=100 },
                new WishListItem{ID= new Guid(),Payee="Porch cat door", EstAmountHigh=1000, EstAmountLow=250 },

            };
            foreach (WishListItem s in wishlistitems)
            {
                context.Transactions.Add(s);
            }
            context.SaveChanges();

        }
    }
}
