using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class DebtItem:Problem
    {
        public float Amount { get; set; }
        public float InterestRate { get; set; }
        public DateTime PayoffDate { get; set; }

    }
}
