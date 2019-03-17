using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class Expense
    {
        public string Name { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public float PriceLow { get; set; }
        public float PriceHigh { get; set; }
        public int PriorityValue { get; set; }
        public string Category { get; set; }
        public string ProblemToSolve { get; set; }
        public string TemporarySolution { get; set; }
        public string TimeBaseSolution { get; set; }
    }
}
