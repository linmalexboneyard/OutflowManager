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
    public class ExpensesController : ControllerBase
    {
        private readonly OutflowManagerContext _context;

        public ExpensesController(OutflowManagerContext context)
        {
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            return await _context.Expenses.ToListAsync();
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(Guid id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }

        // PUT: api/Expenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(Guid id, Expense expense)
        {
            if (id != expense.ID)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
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

        // POST: api/Expenses
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.ID }, expense);
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expense>> DeleteExpense(Guid id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return expense;
        }

        private bool ExpenseExists(Guid id)
        {
            return _context.Expenses.Any(e => e.ID == id);
        }
    }
}
