using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class Expense
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
    }
}
