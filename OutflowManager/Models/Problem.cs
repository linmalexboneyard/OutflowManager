using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutflowManager.Models
{
    public class Problem
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public List<Solution> Solutions { get; set; }
    }
}
