import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from './types'
import { fetchBooks, addInitalBooks, createBook, updateBook, deleteBook } from '@/api/bookApi'

export const useBooksStore = defineStore('books', () => {
  const toast = useToast()

  const books = ref<Book[]>([])

  const selectedBook = ref<Book>({} as Book)
  const setSelectedBook = (book: Book) => {
    selectedBook.value = book
  }

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
    try {
      const fetchedBooks = await fetchBooks()
      books.value = fetchedBooks
    } catch (error) {
      return error
    }
  }

  const init = async () => {
    //fetch the initial book here and set the books ref
    try {
      await addInitalBooks()
      refreshBooks()
    } catch (error) {
      return error
    }
  }

  const addBook = async (book: Book) => {
    try {
      await createBook(book)
      refreshBooks()
    } catch (error) {
      console.log(error)
      toast.add({ title: error as string })
    }
  }

  const deleteBookById = async (id: number) => {
    try {
      await deleteBook(id)
      refreshBooks()
    } catch (error) {
      return error
    }
  }

  const updateBookById = async (book: Book) => {
    try {
      await updateBook(book)
      refreshBooks()
    } catch (error) {
      return error
    }
  }

  return {
    books,
    selectedBook,
    setSelectedBook,
    getBooks,
    init,
    refreshBooks,
    getSearchedBookResults,
    addBook,
    deleteBookById,
    updateBookById,
  }
})
