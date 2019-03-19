using System.ComponentModel.DataAnnotations;

namespace OutflowManager.Models
{
    public class WishListItem:Transaction
    {
        [DataType(DataType.Currency)]
        public float EstAmountHigh { get; set; }
        [DataType(DataType.Currency)]
        public float EstAmountLow { get; set; }
    }
}
