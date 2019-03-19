using Newtonsoft.Json;
using OutflowManager.Utilities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OutflowManager.Models
{
    public class Transaction
    {
        public Guid ID { get; set; }
        public string Payee { get; set; }
        [Column(TypeName = "date"), JsonConverter(typeof(DateConverter))]
        public DateTime? Date { get; set; }
        [DataType(DataType.Currency)]
        public float? Amount { get; set; }
    }

}
