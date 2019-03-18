using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class Solution
    {
        public Guid ID { get; set; }
        public List<Problem> Problems { get; set; }

    }
}
