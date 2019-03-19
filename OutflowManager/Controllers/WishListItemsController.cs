using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OutflowManager.Data;
using OutflowManager.Models;

namespace OutflowManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListItemsController : ControllerBase
    {
        private readonly OutflowManagerContext _context;

        public WishListItemsController(OutflowManagerContext context)
        {
            _context = context;
        }

        // GET: api/WishListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItem>>> GetWishListItems()
        {
            return await _context.WishListItems.ToListAsync();
        }

        // GET: api/WishListItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItem>> GetWishListItem(Guid id)
        {
            var wishListItem = await _context.WishListItems.FindAsync(id);

            if (wishListItem == null)
            {
                return NotFound();
            }

            return wishListItem;
        }

        // PUT: api/WishListItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishListItem(Guid id, WishListItem wishListItem)
        {
            if (id != wishListItem.ID)
            {
                return BadRequest();
            }

            _context.Entry(wishListItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WishListItems
        [HttpPost]
        public async Task<ActionResult<IEnumerable<WishListItem>>> PostWishListItem([FromForm] WishListItem wishListItem)
        {
            _context.WishListItems.Add(wishListItem);
            await _context.SaveChangesAsync();

            return _context.WishListItems.ToListAsync().Result;
        }

        // DELETE: api/WishListItems/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<WishListItem>> DeleteWishListItem(Guid id)
        //{
        //    var wishListItem = await _context.WishListItems.FindAsync(id);
        //    if (wishListItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.WishListItems.Remove(wishListItem);
        //    await _context.SaveChangesAsync();

        //    return wishListItem;
        //}

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<WishListItem>>> DeleteWishListItem(Guid id)
        {
            var wishListItem = await _context.WishListItems.FindAsync(id);
            if (wishListItem == null)
            {
                return NotFound();
            }

            _context.WishListItems.Remove(wishListItem);
            await _context.SaveChangesAsync();

            return _context.WishListItems.ToListAsync().Result;
        }

        private bool WishListItemExists(Guid id)
        {
            return _context.WishListItems.Any(e => e.ID == id);
        }
    }
}
