import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from './types'

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description:
        'A novel set in the Roaring Twenties that tells the story of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
      coverImageUrl: 'image/thumbnail.jpg',
      rating: 4.5,
      comments: 'Good book, really enjoyed the writing style and the portrayal of the era.',
      notes: 'Need to analyze the symbolism in the green light scene for my literature class.',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A novel about the serious issues of racial inequality',
      coverImageUrl: 'image/thumbnail.jpg',
      rating: 5,
      comments: 'A powerful and moving story that addresses important social issues.',
      notes: 'Need to write an essay on the character development of Scout Finch.',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      description:
        'A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.',
      coverImageUrl: 'image/thumbnail.jpg',
      rating: 4,
      comments: 'A thought-provoking and chilling portrayal of a dystopian future.',
      notes: 'Need to discuss the concept of Big Brother in my next book club meeting.',
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description:
        'A classic novel that explores themes of love, class, and social expectations in 19th-century England.',
      coverImageUrl: 'image/thumbnail.jpg',
      rating: 4.5,
      comments: 'A delightful and witty novel with memorable characters.',
      notes: 'Need to analyze the character of Elizabeth Bennet for my literature essay.',
    },
  ])
  const getBooks = computed(() => {
    return books.value
  })
  const getSearchedBookResults = async (searchTerm: string) => {
    const searchResults = ref<Book[]>([])
    books.value.forEach((book: Book) => {
      if (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      ) {
        //add the book to the searchedBooks list
        searchResults.value.push(book)
      }
    })
    return searchResults.value
  }

  const refreshBooks = async () => {
    //fetch the books here after adjustments and set the books ref
  }

  const init = () => {
    //fetch the initial book here and set the books ref
  }

  return {
    books,
    getBooks,
    init,
    getSearchedBookResults,
  }
})
