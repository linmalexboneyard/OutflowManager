using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class Transaction
    {
        public Guid ID { get; set; }
        public string Payee { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public float Amount { get; set; }
        public RequiredVsOptional RequiredStatus { get; set; }
        public FixedOrEstimated FixedExpenseType { get; set; }
    }

    public enum RequiredVsOptional
    {
        Required,
        OptionalButScheduled,
        Optional
    }

    public enum FixedOrEstimated
    {
        Fixed,
        Estimated
    }

    public enum ExpenseType
    {
        Goods,
        Services,
        Subscription
    }
}
