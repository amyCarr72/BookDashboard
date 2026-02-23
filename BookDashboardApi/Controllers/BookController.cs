using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookDashboardApi.Models;

namespace BookDashboardApi.Controllers
{
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookContext _context;

        public BookController(BookContext context)
        {
            _context = context;
        }

        // GET: api/Book
        [HttpGet]
        [Route("getBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Book.ToListAsync();
        }

        // GET: api/Book/5
        [HttpGet]
        [Route("getBook/{id}")]
        public async Task<ActionResult<Book>> GetBooks(long id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("updateBook/{id}")]
        public async Task<IActionResult> PutBook(Guid id, Book book)
        {
            if(BookCommentHorrible(book.Comments))
            {
                return BadRequest("Inappropriate content in comments.");
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExistsId(book.Id))
                {
                    return NotFound("This book does not exist.");
                }
                else
                {
                    return BadRequest("An error occurred while updating the book. Please try again.");
                }
            }

            return Ok("Book updated successfully.");
        }

        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("addBook")]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            //Check if the book already exists based on Id
            //If it does, return a conflict response
            if (BookExistsISBN(book.ISBN))
            {
                return Conflict("That book already exists.");
            }

            //If it doesn't, check if max length of Book list has been reached
            if( _context.Book.Count() >= 25)
            {
                return BadRequest("Maximum number of books reached. Please delete a book before adding a new one.");
            }

            if(BookCommentHorrible(book.Comments))
            {
                return BadRequest("Inappropriate content in comments. Please remove the word 'horrible' from your comments.");
            }

            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooks), new { id = Guid.NewGuid() }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete]
        [Route("deleteBook/{id}")]
        public async Task<IActionResult> DeleteBook(long id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return Ok("Book deleted successfully.");
        }

        [HttpPost]
        [Route("addInitialBooks")]
        public async Task<IActionResult> AddInitialBooks()
        {
            var initialBooks = InitialBooks as List<Book>;

            _context.Book.AddRange(initialBooks);
            await _context.SaveChangesAsync();

            return Ok("Initial books added successfully.");
        }


        private bool BookExistsId(Guid Id)
        {
            return _context.Book.Any(e => e.Id == Id);
        }

        private bool BookExistsISBN(string ISBN)
        {
            return _context.Book.Any(e => e.ISBN == ISBN);
        }

        private bool BookCommentHorrible(string Comment)
        {
            return Comment.Contains("horrible", StringComparison.OrdinalIgnoreCase);
        }

        private static object InitialBooks = new List<Book>
        {
            new Book
            {
                Id = Guid.NewGuid(),
                Author = "Harper Lee",
                Title = "To Kill a Mockingbird",
                ISBN = "9780061120084",
                Rating = 5,
                NoteStatus = "Completed",
                CoverImageUrl = "image/thumbnail.jpg"
            },
            new Book
            {
                Id = Guid.NewGuid(),
                Author = "George Orwell",
                Title = "1984",
                ISBN = "9780451524935",
                Rating = 5,
                NoteStatus = "Reading",
                Comments = "A thought-provoking dystopian novel.",
                CoverImageUrl = "image/thumbnail.jpg"
            },
            new Book
            {
                Id = Guid.NewGuid(),
                Author = "F. Scott Fitzgerald",
                Title = "The Great Gatsby",
                ISBN = "9780743273565",
                Rating = 4,
                NoteStatus = "Completed",
                Comments = "A classic tale of the American Dream.",
                CoverImageUrl = "image/thumbnail.jpg"
            },
            new Book
            {
                Id = Guid.NewGuid(),
                Author = "Jane Austen",
                Title = "Pride and Prejudice",
                ISBN = "9780141439518",
                Rating = 4,
                NoteStatus = "Not Started",
                Comments = "A horrible romance novel.",
                CoverImageUrl = "image/thumbnail.jpg"
            },
            new Book
            {
                Id = Guid.NewGuid(),
                Author = "J.R.R. Tolkien",
                Title = "The Hobbit",
                ISBN = "9780547928227",
                Rating = 5,
                NoteStatus = "On Hold",
                Comments = "An epic fantasy adventure.",
                CoverImageUrl = "image/thumbnail.jpg"
            },
        };  
    }
}
